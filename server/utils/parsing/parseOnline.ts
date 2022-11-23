import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseOnline({ jsonldEvent, keywords }: { jsonldEvent: IJsonldEvent; keywords: string[] }) {
    let online = false;
    if (keywords.includes('online')) online = true;
    if (keywords.includes('stream')) online = true;
    if (keywords.includes('vysilani')) online = true;
    if (keywords.includes('virtualni')) online = true;
    if (keywords.includes('virtual')) online = true;
    if (keywords.includes('webinár')) online = true;

    if (jsonldEvent?.location?.['@type'] === 'VirtualLocation') {
        online = true;
    }

    return { online };
}

/**
 * !!! isOnline
 */
