import { CITIES } from './CITIES';

export function normalizeCity(city: string): string | null {
    for (const [key, alternatives] of Object.entries(CITIES)) {
        for (const alternative of [key, ...alternatives]) {
            if (alternative.toLowerCase( /* TODO: better normalization */) === city.toLowerCase()) {
                return key;
            }
        }
    }
    return null;
}
