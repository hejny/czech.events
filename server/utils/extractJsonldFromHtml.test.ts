import { promises as fs } from 'fs';
import path from 'path';
import { extractJsonldFromHtml } from './extractJsonldFromHtml';

async function fetchMockOf(nameOfService: string) {
    const buffer = await fs.readFile(path.join(__dirname, `../tests/mocks/${nameOfService}.html`));
    return buffer.toString();
}

describe('how ld+json can be scraped from HTML page', () => {
    for (const nameOfService of ['eventbrite', 'facebook', 'katalogakci', 'meetup']) {
        it(`can be scaraped from ${nameOfService}`, async () => {
            expect.assertions(1);
            const event = await extractJsonldFromHtml(await fetchMockOf(nameOfService));
            return expect(event['@type']).toMatch(/^.*[eE]vent$/);
        });
    }
});
