import { IKeywords } from 'n12';
import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseOnline({ keywords, jsonldEvent }: { keywords: IKeywords; jsonldEvent?: IJsonldEvent }) {
    let isOnline = false;
    if (keywords.has('online')) isOnline = true;
    if (keywords.has('stream')) isOnline = true;
    if (keywords.has('vysilani')) isOnline = true;
    if (keywords.has('virtualni')) isOnline = true;
    if (keywords.has('virtual')) isOnline = true;
    if (keywords.has('webinár')) isOnline = true;

    if (jsonldEvent?.location?.['@type'] === 'VirtualLocation') {
        // [🏙️]
        isOnline = true;
    }

    return { isOnline };
}

/**
 * TODO: [🏙️] Can be done the same with ical - for example from geo?
 */
