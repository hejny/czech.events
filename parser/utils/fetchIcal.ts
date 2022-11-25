import { locateChrome } from 'locate-app';
import { forEver, forTime } from 'waitasecond';
import { setFacebookCookies } from '../../scraper/setFacebookCookies';
import { FACEBOOK_COOKIES } from '../config';

import { join } from 'path';
import puppeteer from 'puppeteer-core';

export async function fetchIcal(url: string, isPuppeteerUsed = false): Promise<string> {
    try {
        let icalString;

        if (!isPuppeteerUsed) {
            const response = await fetch(url);
            icalString = await response.text();
        } else {
            const browser = await puppeteer.launch({
                headless: false /* <- !!! true */,
                executablePath: await locateChrome(),
                defaultViewport: null,
            });

            await forTime(1000 /* !!! */);

            const page = await browser.newPage();

            if (/^https:\/\/www.facebook.com/.test(url)) {
                await setFacebookCookies(page, FACEBOOK_COOKIES);
            }

            await forTime(1000 /* !!! */);
            console.log(1 /* !!! */);

            await (page as any)._client.send('Page.setDownloadBehavior', {
                behavior: 'allow',
                downloadPath: join(__dirname, 'facebook.html'),
            });

            await page.goto('https://www.facebook.com');
            //await page.goto( url /* , { waitUntil: 'networkidle0' }*/);

            console.log(2 /* !!! */);
            await forTime(1000 /* !!! */);
            icalString = await page.content();

            console.log(3 /* !!! */);

            console.log({ icalString /* !!! */ });
            await forEver();
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
