import { trimCoreName } from './trimCoreName';

export function parseNameAndTopic(
    fullName: string /* Maybe a description as input? */,
): { name: string; topic: string | null } {
    fullName = fullName.replace(/\(.*?\)/g, ''); // Removing things in (brackets)
    fullName = fullName.replace(new Date().getFullYear().toString(), ''); // Removing current year
    fullName = fullName.replace(/praha|prague|bratislava/gi, ''); // Removing city // TODO: DRY
    fullName = fullName.replace(/canceled|zrušeno|online|stream|vysílání|virtuální|virtual|prezenčně|prez\./gi, ''); // Removing other keywords // TODO: DRY

    // TODO: Full list of the cities
    const result = /\s*(?<name>.*?)\s*(–|(\-)|(\#\d+)|(\|)|(\:))\s*(?<topic>.*)\s*/.exec(fullName);

    if (result) {
        let { name, topic } = result.groups!;
        name = trimCoreName(name);
        topic = trimCoreName(topic);
        return { name, topic };
    }

    return { name: trimCoreName(fullName), topic: null };
}
