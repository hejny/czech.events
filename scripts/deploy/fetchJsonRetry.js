import { forTime } from 'waitasecond';
import fetch from 'isomorphic-fetch';
// TODO: Maybe to waitasecond

export async function fetchJsonRetry(url) {
    let lastError = null;

    for (let i = 0; i < 1000; i++) {
        await forTime(200);
        try {
            console.info(`Trying to fetch "${url}".`);
            const response = await fetch(url, { cache: 'no-store' });
            return await response.json();
        } catch (error) {
            lastError = error;
        }
    }

    throw new Error(lastError);
}
