import chalk from 'chalk';
import { locateChrome } from 'locate-app';
import { join } from 'path';
import puppeteer from 'puppeteer-core';
import { forTime } from 'waitasecond';
import { FACEBOOK_COOKIES } from './config';
import { EVENT_SOURCES } from './eventSources';
import { setFacebookCookies } from './setFacebookCookies';

main();

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: await locateChrome(), //'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        defaultViewport: null,
        args: [
            //'--proxy-server=socks5://127.0.0.1:9050',
            `--disable-extensions-except=${join(__dirname, '../button-webextension')}`,
            `--load-extension=${join(__dirname, '../button-webextension')}`,
            '--enable-automation',
        ],
    });

    browser.on('disconnected', () => {
        console.log('browser disconnected');
        process.exit(1);
    });

    for (const eventSourceUrl of EVENT_SOURCES) {
        console.info(chalk.bgGray(eventSourceUrl));

        const eventSourcePage = (await (await browser.pages())[0]) || (await browser.newPage());

        if (/^https:\/\/www.facebook.com/.test(eventSourceUrl)) {
            await setFacebookCookies(eventSourcePage, FACEBOOK_COOKIES);
        }

        await eventSourcePage.goto(
            eventSourceUrl,

            { waitUntil: 'networkidle2' },
        );

        const hrefs: string[] = await Promise.all(
            (await eventSourcePage.$x('//a')).map(
                async (element) => (await element.getProperty('href'))._remoteObject.value,
            ),
        );

        const eventUrls: string[] = hrefs
            .filter((href) => {
                if (/^https:\/\/www.facebook.com/.test(href)) {
                    return /\/events\/[0-9]+/.test(href);
                } else if (/^https:\/\/www.meetup.com/.test(href)) {
                    return /\/events\/[0-9]+/.test(href);
                } else if (/^https:\/\/www.eventbrite.com/.test(href)) {
                    return /\/e\/[0-9]+/.test(href);
                } else if (/^https:\/\/it.katalogakci.cz/.test(href)) {
                    return /\/Event\/[0-9]+/.test(href);
                } else if (/^https:\/\/www.wug.cz/.test(href)) {
                    return /\/akce\/[0-9]+/.test(href);
                } else {
                    return /^https?:\/\//.test(href);
                }
            })
            .map((href) => {
                const url = new URL(href);
                url.search = '';
                url.hash = '';
                url.pathname = url.pathname
                    .split('/')
                    .filter((x) => x !== '')
                    .join('/');

                return url.href;
            });

        for (const eventUrl of eventUrls) {
            // console.info(chalk.gray(eventUrl));

            const eventPage = await browser.newPage();
            await eventPage.goto(eventUrl);

            const isScrapable = await Promise.race([
                eventPage.waitForXPath(`//*[contains(@class, 'update-visible')]`).then(() => 'SCRAPABLE'),
                eventPage.waitForXPath(`//*[contains(@class, 'update')]`).then(() => 'SCRAPED'),
                forTime(5000).then(() => 'NOT_SCRAPABLE'),
            ]);

            if (isScrapable === 'SCRAPABLE') {
                await eventPage.click(`.update-visible`);
                await forTime(15000);
                console.info(chalk.green(eventUrl));
            } else if (isScrapable === 'SCRAPED') {
                console.info(chalk.yellow(eventUrl));
            } else if (isScrapable === 'NOT_SCRAPABLE') {
                console.info(chalk.red(eventUrl));
            }
            await eventPage.close();
        }
        // Note: Do not close only page: await eventSourcePage.close();
    }
}
