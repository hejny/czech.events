export const CITIES: Record<string, string[]> = {
    Praha: ['Praze', 'Prague', 'PRG', 'Loď Tajemství'],
    Brno: ['Brně', 'BRN'],
    Ostrava: ['Ostravě', 'Ostrava-Vítkovice'],
    Plzeň: ['Plzni', 'Pilsen', 'SIT Port'],
    Liberec: ['Liberci'],
    Olomouc: ['Olomouci'],
    'České Budějovice': ['Budějovicích', 'Budějicích'],
    'Ústí nad Labem': [],
    'Hradec Králové': ['Hradci'],
    Zlín: ['Zlíně'],
    Havířov: ['Havířově'],
    Kladno: ['Kladně'],
    Most: [],
    Opava: [],
    'Frýdek Místek': [],
    Karviná: [],
    Jihlava: ['Jihlavě'],
    Teplice: [],
    Děčín: [],

    // Slovakia
    Bratislava: [],
    Košice: [],
    Prešov: [],
    Žilina: [],
};

// @ts-ignore
export const CITIES_KEYWORDS: Array<string> = Object.entries(CITIES).reduce(
    // @ts-ignore
    (cities, [city, alternatives]) => [...cities, city, ...alternatives],
    [],
);
