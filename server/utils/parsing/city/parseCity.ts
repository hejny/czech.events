import { ISemanticEvent } from '../../../interfaces/jsonld/ISemanticEvent';
import { CITIES } from './CITIES';
import { normalizeCity } from './normalizeCity';

export function parseCity({ semanticEvent, keywords }: { semanticEvent: ISemanticEvent; keywords: string[] }) {
    let city: null | string = null;
    if (semanticEvent?.location?.address?.addressLocality) {
        city = semanticEvent.location.address.addressLocality;
        // TODO: Normalize aleternatives from CITIES

        const normalizedCity = normalizeCity(city);

        if (normalizedCity) {
            city = normalizedCity;
        } else {
            console.warn(`City "${city}" is not in the list.`);
        }
    }

    if (typeof city !== 'string') {
        city = null;
    }

    if (!city) {
        const citiesFromKeywords: Set<string> = new Set();

        for (const [key, alternatives] of Object.entries(CITIES)) {
            if (keywords.includes(key.toLowerCase())) {
                citiesFromKeywords.add(key);
            }

            for (const alternative of alternatives) {
                if (keywords.includes(alternative.toLowerCase())) {
                    citiesFromKeywords.add(key);
                }
            }
        }

        if (citiesFromKeywords.size === 1) {
            city = [...citiesFromKeywords][0];
        } else if (citiesFromKeywords.size > 1) {
            console.warn(`There are more cities parsed from keywords ${[...citiesFromKeywords].join(', ')}.`);
        }

        // console.log({ CITIES, keywords, citiesFromKeywords, city });
    }

    // TODO: Pilsen easter egg

    return { city };
}
