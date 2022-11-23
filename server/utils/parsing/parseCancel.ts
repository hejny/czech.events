import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseCancel({ jsonldEvent, keywords }: { jsonldEvent: IJsonldEvent; keywords: string[] }) {
    let canceled = false;
    // Probbably? Note: canceled is detected by not fetching JSON LD
    if (keywords.includes('zruseno')) canceled = true;
    if (keywords.includes('canceled')) canceled = true;
    if (keywords.includes('postponed')) canceled = true;
    return { canceled };
}

/**
 * !!! isCanceled
 */
