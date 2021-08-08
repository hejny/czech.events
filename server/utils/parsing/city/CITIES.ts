export const CITIES: Record<string, string[]> = {
    Praha: ['Praze', 'Prague', 'PRG'],
    Brno: ['Brně', 'BRN'],
    Ostrava: ['Ostravě'],
    Plzeň: ['Plzni', 'Pilsen', 'SitPort'],
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

export const CITIES_KEYWORDS: Array<string> = Object.entries(CITIES).reduce(
    (cities, [city, alternatives]) => [...cities, city, ...alternatives],
    [],
);
