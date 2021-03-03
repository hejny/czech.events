import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseCity({ semanticEvent }: { semanticEvent: ISemanticEvent }) {
    let city: null | string = null;
    if (semanticEvent?.location?.address?.addressLocality) {
        city = semanticEvent.location.address.addressLocality;
    }
    // TODO: More methods of parsing the city
    return { city };
}
