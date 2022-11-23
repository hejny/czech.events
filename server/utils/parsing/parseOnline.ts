import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseOnline({ keywords, jsonldEvent }: { keywords: string[]; jsonldEvent?: IJsonldEvent }) {
    let online = false;
    if (keywords.includes('online')) online = true;
    if (keywords.includes('stream')) online = true;
    if (keywords.includes('vysilani')) online = true;
    if (keywords.includes('virtualni')) online = true;
    if (keywords.includes('virtual')) online = true;
    if (keywords.includes('webinár')) online = true;

    if (jsonldEvent?.location?.['@type'] === 'VirtualLocation') {
        // [🏙️]
        online = true;
    }

    return { online };
}

/**
 * TODO: [🏙️] Can be done the same with ical - for example from geo?
 * !!! isOnline
 */
