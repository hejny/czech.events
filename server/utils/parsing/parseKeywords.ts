import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

// TODO: Use instead i12
export function parseKeywords({ semanticEvent }: { semanticEvent: ISemanticEvent }): { keywords: string[] } {
    // TODO: normalize !! - toLowerCase also for ěščřžýáíéúů
    const keywords = `${semanticEvent.name} ${semanticEvent.description}`.toLowerCase().split(/\s+/);
    return { keywords };
}
