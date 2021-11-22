import { ISemanticEvent } from '../interfaces/jsonld/ISemanticEvent';

export async function extractJsonldFromHtml(html: string): Promise<ISemanticEvent> {
    const pattern = /<script[\sa-zA-Z0-p-_="']+type=["']application\/ld\+json["'][\sa-zA-Z0-p-_="']*>(.*?)<\/script\s*>/gs;

    const jsonlds: ISemanticEvent[] = [];

    // TODO: Can I parse RegExp more elegantly - functionally?
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html))) {
        const [_, jsonldstring] = match;
        const parsed = JSON.parse(jsonldstring);
        if (parsed instanceof Array) {
            for (const piece of parsed) {
                jsonlds.push(piece);
            }
        } else {
            jsonlds.push(parsed);
        }
    }

    if (jsonlds.length === 0) {
        const errorMatch = /class="fb_content.*<h2.*>(?<message>.*)<\/h2>/.exec(html);

        if (errorMatch) {
            const { message } = errorMatch.groups;
            throw new ParsingError(`Facebook: ` + message, html);
        } else {
            throw new ParsingError(`JSON LD not found for unknown reason`, html);
        }
    }

    const jsonldsEvents = jsonlds.filter((jsonld) => /^.*(?<!Whatever)(?<!Sale)[eE]vent$/.test(jsonld['@type']));

    if (jsonldsEvents.length === 0) {
        throw new ParsingError(`There is no parsed event JSON+LD in the html.`, html, { html, jsonldsEvents });
    }

    return jsonldsEvents[0];
}

class ParsingError extends Error {
    public name = 'ParsingError';

    constructor(message: string, public unparsableHtml: string, public details?: any) {
        super(message);
    }
}
