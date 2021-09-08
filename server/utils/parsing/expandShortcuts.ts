export function expandShortcuts(sentence: string): string {
    return sentence.replace(
        'PPUG',
        'Power platform user group',
        // Note: expanding unclear acronyms
    );
}
