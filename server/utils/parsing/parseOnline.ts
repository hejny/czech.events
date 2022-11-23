import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseOnline({ keywords, jsonldEvent }: { keywords: string[]; jsonldEvent?: IJsonldEvent }) {
    let isOnline = false;
    if (keywords.includes('online')) isOnline = true;
    if (keywords.includes('stream')) isOnline = true;
    if (keywords.includes('vysilani')) isOnline = true;
    if (keywords.includes('virtualni')) isOnline = true;
    if (keywords.includes('virtual')) isOnline = true;
    if (keywords.includes('webinár')) isOnline = true;

    if (jsonldEvent?.location?.['@type'] === 'VirtualLocation') {
        // [🏙️]
        isOnline = true;
    }

    return { isOnline };
}

/**
 * TODO: [🏙️] Can be done the same with ical - for example from geo?
 */
