import { ISemanticEvent } from '../../../interfaces/jsonld/ISemanticEvent';
import { CITIES } from './CITIES';
import { normalizeCity } from './normalizeCity';

export function parseCity({
    semanticEvent,
    keywords,
}: {
    semanticEvent: ISemanticEvent;
    keywords: string[];
}): { city: string | null } {
    for (const possibleCity of [
        semanticEvent?.location?.name,
        semanticEvent?.location?.address?.addressLocality,
    ].filter((adress) => adress !== null && adress !== undefined)) {
        // console.log({ possibleCity });
        // TODO: Normalize aleternatives from CITIES

        const normalizedCity = normalizeCity(possibleCity);

        if (normalizedCity) {
            return { city: normalizedCity };
        } else {
            console.warn(`City "${possibleCity}" is not in the list.`);
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
        return { city: [...citiesFromKeywords][0] };
    } else if (citiesFromKeywords.size > 1) {
        console.warn(`There are more cities parsed from keywords ${[...citiesFromKeywords].join(', ')}.`);
        return { city: null };
    }

    return { city: null };
}
