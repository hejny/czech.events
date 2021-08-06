import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

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
                    citiesFromKeywords.add(alternative);
                }
            }
        }

        if (citiesFromKeywords.size === 1) {
            city = [...citiesFromKeywords][0];
        } else if (citiesFromKeywords.size > 1) {
            console.warn(`There are more cities parsed from keywords ${[...citiesFromKeywords].join(', ')}.`);
        }

        console.log({ keywords, citiesFromKeywords, city });
    }

    // TODO: Pilsen easter egg

    return { city };
}

function normalizeCity(city: string): string | null {
    for (const [key, alternatives] of Object.entries(CITIES)) {
        for (const alternative of [key, ...alternatives]) {
            if (alternative.toLowerCase(/* TODO: better normalization */) === city.toLowerCase()) {
                return key;
            }
        }
    }
    return null;
}

const CITIES: Record<string, string[]> = {
    Praha: ['Prague'],
    Brno: [],
    Ostrava: [],
    Plzeň: ['Pilsen'],
    Liberec: [],
    Olomouc: [],
    'České Budějovice': [],
    'Ústí nad Labem': [],
    'Hradec Králové': [],
    Zlín: [],
    Havířov: [],
    Kladno: [],
    Most: [],
    Opava: [],
    'Frýdek Místek': [],
    Karviná: [],
    Jihlava: [],
    Teplice: [],
    Děčín: [],

    // Slovakia
    Bratislava: [],
    Košice: [],
    Prešov: [],
    Žilina: [],
};
