import { removeCity } from './city/removeCity';
import { removeTiming } from './removeTiming';
import { trimCoreName } from './trimCoreName';

export function parseNameAndTopic(
    fullName: string /* Maybe a description as input? */,
): { name: string; topic: string | null } {
    fullName = fullName.replace(`tart-up`, 'tartup');
    fullName = fullName.replace(/\(.*?\)/g, ''); // Removing things in (brackets)
    fullName = removeTiming(fullName);
    fullName = removeCity(fullName);
    // TODO: More removing utils as external functions
    fullName = fullName.replace(/canceled|zrušeno|online|stream|vysílání|virtuální|virtual|prezenčně|prez\./gi, ''); // Removing other keywords // TODO: DRY

    const result = /\s*(?<name>.*?)\s*(–|(\-)|(\#\d+)|(\|)|(\:))\s*(?<topic>.*)\s*/.exec(fullName);

    if (result) {
        let { name, topic } = result.groups!;
        name = trimCoreName(name);
        topic = trimCoreName(topic);
        return { name, topic };
    }

    return { name: trimCoreName(fullName), topic: null };
}
