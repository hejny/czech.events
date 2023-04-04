import { Page } from 'puppeteer-core';

export interface IMeetupCookies {
    // TODO:
}

/**
 * @deprecated use userDataDir pattern instead
 */
export async function setMeetupCookies(page: Page, facebookCookies: IMeetupCookies): Promise<void> {
    for (const [name, value] of Object.entries(facebookCookies)) {
        await page.setCookie({
            domain: '.meetup.com',
            name,
            value: value.toString(),
        });
    }
}
