import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

// TODO: Use instead i12
export function parseKeywords({
    semanticEvent,
}: {
    semanticEvent: ISemanticEvent;
}): { keywords: string[]; keywordsFromName: string[]; keywordsFromDescription: string[] } {
    // TODO: normalize !! - toLowerCase also for ěščřžýáíéúů
    const keywordsFromName = semanticEvent.name.toLowerCase().split(/\s+/);
    const keywordsFromDescription = semanticEvent.description.toLowerCase().split(/\s+/);
    return { keywordsFromName, keywordsFromDescription, keywords: [...keywordsFromName, ...keywordsFromDescription] };
}
