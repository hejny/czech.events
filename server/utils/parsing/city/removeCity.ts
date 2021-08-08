import { CITIES_KEYWORDS } from './CITIES';

export function removeCity(sentence: string): string {
    for (const city of CITIES_KEYWORDS) {
        sentence = sentence.replace(`v ${city}`, '');
        sentence = sentence.replace(`in ${city}`, '');
        sentence = sentence.replace(city, '');
    }
    return sentence.trim();
}
