export function removeMetalabels(sentence: string): string {
    return ` ${sentence} `
        .replace(
            /(?<=[\s.])(canceled|zrušeno|online|offline|stream|vysílání|virtuální|virtual|prezenčně|live|(prez\.)|czsk)(?=[\s.])/gim,
            '',
        )
        .trim(); // Note: Removing other keywords // TODO: DRY
}
