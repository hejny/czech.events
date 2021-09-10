import { parseKeywords } from 'n12';
import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseKeywordsFromSemanticEvent({
    semanticEvent,
}: {
    semanticEvent: ISemanticEvent;
}): { keywords: string[]; keywordsFromName: string[]; keywordsFromDescription: string[] } {
    const keywords = parseKeywords(semanticEvent);
    const keywordsFromName = parseKeywords(semanticEvent.name);
    const keywordsFromDescription = parseKeywords(semanticEvent.description);
    return { keywordsFromName, keywordsFromDescription, keywords };
}
