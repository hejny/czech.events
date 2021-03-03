import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseSerializeId({ semanticEvent, url }: { semanticEvent: ISemanticEvent; url?: string }) {
    // TODO: Make some normalization
    const serializeId = new URL(url || semanticEvent.url).toString().replace(/\/$/, '');
    return { serializeId };
}
