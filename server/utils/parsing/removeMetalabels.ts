export function removeMetalabels(sentence: string): string {
    return sentence
        .replace(/(canceled|zrušeno|online|stream|vysílání|virtuální|virtual|prezenčně|(prez\.)|czsk)/gi, '')
        .trim(); // Note: Removing other keywords // TODO: DRY
}
