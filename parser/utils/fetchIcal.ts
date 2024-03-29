import { mkdir, readdir, readFile, unlink, writeFile } from 'fs/promises';
import { locateChrome } from 'locate-app';
import fetch from 'node-fetch';
import { join } from 'path';
import puppeteer from 'puppeteer-core';
import { spaceTrim } from 'spacetrim';
import { forTime } from 'waitasecond';
import { FACEBOOK_COOKIES, MEETUP_COOKIES } from '../config';
import { setFacebookCookies } from './setFacebookCookies';
import { setMeetupCookies } from './setMeetupCookies';

const tmpPath = join(__dirname, 'tmp'); /* <- !! Better tmp folder */
const downloadPath = join(tmpPath, 'downloads');
const errorsPath = join(tmpPath, 'errors');

export async function fetchIcal(url: string, isPuppeteerUsed = false): Promise<string> {
    await mkdir(downloadPath, { recursive: true });
    await mkdir(errorsPath, { recursive: true });

    try {
        let icalString: string;

        if (!isPuppeteerUsed) {
            const response = await fetch(url);
            icalString = await response.text();
        } else {
            const browser = await puppeteer.launch({
                headless: true,
                executablePath: await locateChrome(),
                defaultViewport: null,
                userDataDir: join(process.cwd(), '.tmp', 'puppeteer', 'scraper-user-data'),
            });

            const page = await browser.newPage();

            if (/^https:\/\/www.facebook.com/.test(url)) {
                await setFacebookCookies(page, FACEBOOK_COOKIES);
                // await forPlayFirstWithPause('scraping facebook with cookies');
            } else if (/^https:\/\/www.meetup.com/.test(url)) {
                await setMeetupCookies(page, MEETUP_COOKIES);
                // await forPlayFirstWithPause('scraping meetup with cookies');
            }

            const client = await page.target().createCDPSession();
            await client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath,
            });

            await page.goto(url).catch(() => {
                // Note: This is a weird hack without it there occurs an error "net::ERR_ABORTED"
            });

            await forTime(
                1000 * 3 /* Note: Maybe this waiting is pointless but to be sure that the file is fully downloaded */,
            );

            // TODO: Maybe recycle the browser until the end of the parsing
            browser.close();

            const files = await readdir(downloadPath);

            if (files.length > 1) {
                throw new Error(
                    spaceTrim(`
                        There is more than one downloaded file
                        ${downloadPath} was not clean or two parsers are running in parallel
                    `),
                );
            }

            const fileName = files[0];
            const filePath = join(downloadPath, fileName);

            icalString = await readFile(filePath, 'utf-8');

            await unlink(filePath);
        }

        // console.log({ icalString });
        // import { writeFile } from 'fs/promises';
        // await writeFile(join(__dirname, 'facebook.html'), icalString);

        const fbErrors = icalString.match(/class="fb_content.*<h2.*>(?<message>.*)<\/h2>/);
        if (fbErrors) {
            throw new FacebookError(fbErrors.groups!.message!);
        }

        if (!/BEGIN\:VCALENDAR/.test(icalString)) {
            const errorPath = join(errorsPath, url + '.html');
            await writeFile(errorPath, icalString);
            throw new Error(
                spaceTrim(`
                Source does not looks like a valid ICal

                See the file ${errorPath.split('\\').join('/')}

            `),
            );
        }

        return icalString;
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        if (!isPuppeteerUsed) {
            // TODO: What to use in async tail recursion: return OR return await
            return await fetchIcal(url, true);
        }

        throw error;
    }
}

class FacebookError extends Error {
    public name = 'FacebookError';
}
