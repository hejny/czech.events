export function removeMetalabels(sentence: string): string {
    return sentence
        .replace(/(canceled|zrušeno|online|offline|stream|vysílání|virtuální|virtual|prezenčně|live|(prez\.)|czsk)/gi, '')
        .trim(); // Note: Removing other keywords // TODO: DRY
}
