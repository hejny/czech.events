import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseCity({ semanticEvent }: { semanticEvent: ISemanticEvent }) {
    let city: null | string = null;
    if (semanticEvent?.location?.address?.addressLocality) {
        city = semanticEvent.location.address.addressLocality;
    }

    if (typeof city !== 'string') {
        city = null;
    }

    // TODO: More methods of parsing the city
    return { city };
}
