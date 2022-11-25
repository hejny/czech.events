import { IKeywords, parseKeywords } from 'n12';
import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseKeywordsFromJsonldEvent({
    jsonldEvent,
}: {
    jsonldEvent: IJsonldEvent;
}): { keywords: IKeywords; keywordsFromName: IKeywords; keywordsFromDescription: IKeywords } {
    const keywords = parseKeywords(jsonldEvent);
    const keywordsFromName = parseKeywords(jsonldEvent.name);
    const keywordsFromDescription = parseKeywords(jsonldEvent.description);
    return { keywordsFromName, keywordsFromDescription, keywords };
}
