import chalk from 'chalk';
import { spawn } from 'child_process';
import { locateChrome } from 'locate-app';
import { join } from 'path';
import puppeteer from 'puppeteer-core';
import { forTime } from 'waitasecond';
import { connectionPromise } from '../server/database';
import { EventSource } from '../src/model/database/EventSource';
import { FACEBOOK_COOKIES } from './config';
import { forPlay } from './forPlay';
import { setFacebookCookies } from './setFacebookCookies';

main();

async function main() {
    console.clear();
    console.log(chalk.bgBlue(' 🔥 Scraper '));

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: await locateChrome(),
        defaultViewport: null,
        args: [
            //'--proxy-server=socks5://127.0.0.1:9050',
            `--disable-extensions-except=${join(__dirname, '../button-webextension')}`,
            `--load-extension=${join(__dirname, '../button-webextension')}`,
            '--enable-automation',

            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
        ],
    });

    browser.on('disconnected', () => {
        console.log('browser disconnected');
        process.exit(1);
    });

    await forPlay();

    const firstPage = await browser.newPage();
    /* not await */ firstPage.goto(`https://www.pavolhejny.com/`);

    await Promise.race([
        new Promise<void>((resolve, reject) => {
            const eventEmmiter = firstPage.on('console', (msg) => {
                console.info(chalk.gray('> ' + msg.text()));
                if (/Czech\.events/i.test(msg.text())) {
                    eventEmmiter.removeAllListeners('console');
                    resolve();
                }
            });
        }),
        forTime(5000).then(() => Promise.reject(new Error('Browser webextension is not running.'))),
    ]);

    // await firstPage.close();

    await forPlay();

    const eventSources = await (await connectionPromise).manager.find(EventSource, { order: { id: 'ASC' } });

    for (const eventSource of eventSources) {
        await forPlay();

        const eventSourceUrl = eventSource.url;
        let eventSourcePage: puppeteer.Page;

        try {
            console.info(chalk.bgGray(eventSourceUrl));

            eventSourcePage = await browser.newPage();

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

            const eventUrls: string[] = Array.from(
                new Set(
                    hrefs
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

                            if (url.hostname === 'www.facebook.com') {
                                // Note: Sometimes happen that mobile version of facebook has JSON+LD but desktop version doesn't.
                                url.hostname = 'm.facebook.com';
                            }

                            return url.href;
                        }),
                ),
            );

            console.info(chalk.gray(`Going to scrape ${eventUrls.join(', ')}`));

            // TODO: Probbably make this scraping paralel
            for (const eventUrl of eventUrls) {
                await forPlay();
                // console.info(chalk.gray(eventUrl));

                const eventPage = await browser.newPage();
                await eventPage.goto(eventUrl, { waitUntil: 'networkidle2' });
                await eventPage.bringToFront();

                const isScrapable = await Promise.race([
                    eventPage.waitForXPath(`//*[contains(@class, 'update-visible')]`).then(() => 'SCRAPABLE'),
                    eventPage.waitForXPath(`//*[contains(@class, 'update')]`).then(() => 'SCRAPED'),
                    forTime(5000 /* !!! What is the best number to wait */).then(() => 'NOT_SCRAPABLE'),
                ]);

                if (isScrapable === 'SCRAPABLE') {
                    await eventPage.click(`.update-visible`);
                    console.info(chalk.green('[✓] ' + eventUrl));
                    spawn(await locateChrome(), [eventUrl]);
                } else if (isScrapable === 'SCRAPED') {
                    console.info(chalk.yellow('[-] ' + eventUrl));
                } else if (isScrapable === 'NOT_SCRAPABLE') {
                    console.info(chalk.red('[×] ' + eventUrl));
                }
                await forTime(1000 + 100000 * Math.random());
                await eventPage.close();
            }
        } catch (error) {
            console.error(error);
        } finally {
            await eventSourcePage.close();
        }
    }

    console.info(chalk.bgGreen('[ Done ]'));
}
