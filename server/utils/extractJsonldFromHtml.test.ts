import { promises as fs } from 'fs';
import path from 'path';
import { extractJsonldFromHtml } from './extractJsonldFromHtml';

async function fetchMockOf(nameOfService: string) {
    const buffer = await fs.readFile(path.join(__dirname, `../mocks/${nameOfService}.html`));
    return buffer.toString();
}

describe('how ld+json can be scraped from HTML page', () => {
    for (const nameOfService of ['eventbrite', 'facebook', 'katalogakci', 'meetup']) {
        it(`can be scaraped from ${nameOfService}`, async () => {
            const event = await extractJsonldFromHtml(await fetchMockOf(nameOfService));
            expect(event['@type']).toMatch(/^.*[eE]vent$/);

            expect.assertions(1);
        });
    }
});
