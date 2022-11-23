import { IJsonldEvent } from '../../../interfaces/jsonld/IJsonldEvent';
import { CITIES } from './CITIES';
import { normalizeCity } from './normalizeCity';

export function parseCity({
    keywords,
    jsonldEvent,
}: {
    keywords: string[];
    jsonldEvent?: IJsonldEvent;
}): { city: string | null } {
    if (jsonldEvent?.location?.['@type'] === 'VirtualLocation') {
        // [🏙️]
        return { city: null };
    }

    if (jsonldEvent?.location) {
        for (const possibleCity of [jsonldEvent.location.name, jsonldEvent.location.address?.addressLocality].filter(
            (adress) => adress !== null && adress !== undefined,
        )) {
            // console.log({ possibleCity });
            // TODO: Normalize aleternatives from CITIES

            const normalizedCity = normalizeCity(possibleCity);

            if (normalizedCity) {
                return { city: normalizedCity };
            } /*else {
            console.warn(`City "${possibleCity}" is not in the list.`);
        }*/
        }
    }

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
        return { city: Array.from(citiesFromKeywords)[0] };
    } else if (citiesFromKeywords.size > 1) {
        console.warn(`There are more cities parsed from keywords ${[Array.from(citiesFromKeywords)].join(', ')}.`);
        return { city: null };
    }

    return { city: null };
}

/**
 * TODO: [🏙️] Can be done the same with ical - for example from geo?
 */
