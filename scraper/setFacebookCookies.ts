import { Page } from 'puppeteer-core';

export interface IFacebookCookies {
    c_user: number;
    xs: string;
}

export async function setFacebookCookies(page: Page, facebookCookies: IFacebookCookies): Promise<void> {
    for (const [name, value] of Object.entries(facebookCookies)) {
        await page.setCookie({
            domain: '.facebook.com',
            name,
            value: value.toString(),
        });
    }
}
