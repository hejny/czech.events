import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseOnline({ semanticEvent, keywords }: { semanticEvent: ISemanticEvent; keywords: string[] }) {
    let online = false;
    if (keywords.includes('online')) online = true;
    if (keywords.includes('stream')) online = true;
    if (keywords.includes('vysilani')) online = true;
    if (keywords.includes('virtualni')) online = true;
    if (keywords.includes('virtual')) online = true;
    if (keywords.includes('webinár')) online = true;

    if (semanticEvent?.location?.['@type'] === 'VirtualLocation') {
        online = true;
    }

    return { online };
}

/**
 * !!! isOnline
 */
