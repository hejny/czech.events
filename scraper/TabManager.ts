import { IDestroyable, Registration } from 'destroyable';
import puppeteer from 'puppeteer-core';

export class TabManager {
    private pagesWithInfo: Array<{ isFree: boolean; page: puppeteer.Page }> = [];

    constructor(private browser: puppeteer.Browser, private options: { preparePages: number }) {
        this.init();
    }

    private async init() {
        const firstPage = (await (await this.browser.pages())[0]) || (await this.browser.newPage());
        await this.createFreePage(firstPage);

        for (let i = (await this.browser.pages()).length; i < this.options.preparePages; i++) {
            await this.createFreePage();
        }
    }

    private async createFreePage(page?: puppeteer.Page) {
        const pageWithInfo = { isFree: true, page: page ? page : await this.browser.newPage() };
        this.pagesWithInfo.push(pageWithInfo);
        return pageWithInfo;
    }

    public async takePage(): Promise<puppeteer.Page & IDestroyable> {
        let freePage = this.pagesWithInfo.find(({ isFree }) => isFree);

        if (!freePage) {
            freePage = await this.createFreePage();
        }

        const destroyable = Registration.create(() => {
            freePage.isFree = false;

            return async () => {
                await freePage.page.goto('about:blank');
                freePage.isFree = true;
            };
        });

        return new Proxy(
            // TODO: This Proxy logic can be build in destroyable library
            freePage.page,
            {
                get: function (target, prop, receiver) {
                    console.log({ prop });
                    if (destroyable[prop]) {
                        return destroyable[prop];
                    } else {
                        // TODO: Do not expose puppeteer.Page.close but instead call destroy
                        return Reflect.get(target, prop, receiver);
                    }
                },
            },
        ) as puppeteer.Page & IDestroyable;
    }
}

/**
 * TODO:
 * - Preserve tab order
 */

/*

    const tabManager = new TabManager(browser, { preparePages: 3 });

    console.log('page1');
    const page1 = await tabManager.newPage();
    await page1.goto(`https://www.pavolhejny.com/`, { waitUntil: 'networkidle2' });
    console.log('page2');
    const page2 = await tabManager.newPage();
    await page2.goto(`https://www.pavolhejny.com/`, { waitUntil: 'networkidle2' });
    console.log('page3');
    const page3 = await tabManager.newPage();
    console.log('page3 - a');
    await page3.goto(`https://www.pavolhejny.com/`, { waitUntil: 'networkidle2' });
    console.log('page4');
    const page4 = await tabManager.newPage();
    await page4.goto(`https://www.pavolhejny.com/`, { waitUntil: 'networkidle2' });

    console.log('destroy');
    await page1.destroy();
    await page4.destroy();

    await forTime(5000);

    console.log('page5');
    const page5 = await tabManager.newPage();
    await page5.goto(`https://www.pavolhejny.com/`, { waitUntil: 'networkidle2' });
    console.log('page6');
    const page6 = await tabManager.newPage();
    await page6.goto(`https://www.pavolhejny.com/`, { waitUntil: 'networkidle2' });


*/
