import { locateChrome } from 'locate-app';
import { forImmediate } from 'waitasecond';
import { setFacebookCookies } from '../../scraper/setFacebookCookies';
import { FACEBOOK_COOKIES } from '../config';

import puppeteer from 'puppeteer-core';

export async function fetchIcal(url: string, isPuppeteerUsed = false): Promise<string> {
    try {
        let icalString: string;

        if (!isPuppeteerUsed) {
            const response = await fetch(url);
            icalString = await response.text();
        } else {
            const browser = await puppeteer.launch({
                headless: false /* <- !!! true */,
                executablePath: await locateChrome(),
                defaultViewport: null,
            });

            const page = await browser.newPage();

            if (/^https:\/\/www.facebook.com/.test(url)) {
                await setFacebookCookies(page, FACEBOOK_COOKIES);
            }

            (async () => {
                await forImmediate();
                await page.goto(url).catch(() => {
                    // Note: Here will just happen an error bacause puppeteer can not download a file
                    //       But it does not matter because response is already intercepter in the code just bellow
                });
            })();

            icalString = await new Promise<string>((resolve, reject) => {
                page.on('response', async (response) => {
                    if (response.url() !== url) {
                        return;
                    }

                    console.log(response);

                    const content = await response.text();
                    resolve(content);
                });
            });
        }

        // console.log({ icalString });
        // import { writeFile } from 'fs/promises';
        // await writeFile(join(__dirname, 'facebook.html'), icalString);

        const fbErrors = icalString.match(/class="fb_content.*<h2.*>(?<message>.*)<\/h2>/);
        if (fbErrors) {
            throw new FacebookError(fbErrors.groups!.message!);
        }

        if (!/BEGIN\:VCALENDAR/.test(icalString)) {
            throw new Error(`Source does not looks like a valid ICal`);
        }

        return icalString;
    } catch (error) {
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
