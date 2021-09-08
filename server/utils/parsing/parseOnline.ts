import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseOnline({ semanticEvent, keywords }: { semanticEvent: ISemanticEvent; keywords: string[] }) {
    let online = false;
    if (keywords.includes('online')) online = true;
    if (keywords.includes('stream')) online = true;
    if (keywords.includes('vysílání')) online = true;
    if (keywords.includes('virtuální')) online = true;
    if (keywords.includes('virtual')) online = true;
    if (keywords.includes('webinář')) online = true;

    if (semanticEvent?.location?.['@type'] === 'VirtualLocation') {
        online = true;
    }

    return { online };
}
