import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseCancel({ semanticEvent, keywords }: { semanticEvent: ISemanticEvent; keywords: string[] }) {
    let canceled = false;
    // Probbably? Note: canceled is detected by not fetching JSON LD
    if (keywords.includes('zrušeno')) canceled = true;
    if (keywords.includes('canceled')) canceled = true;
    return { canceled };
}
