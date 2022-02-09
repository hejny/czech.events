import { CITIES } from './CITIES';

export function normalizeCity(city: string): string | null {
    if (!city || typeof city === 'object') {
        return null;
    }

    for (const [key, alternatives] of Object.entries(CITIES)) {
        for (const alternative of [key, ...alternatives]) {
            if (alternative.toLowerCase(/* TODO: better normalization */) === city.toLowerCase()) {
                return key;
            }
        }
    }
    return null;
}
