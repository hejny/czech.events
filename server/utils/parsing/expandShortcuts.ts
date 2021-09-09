export function expandShortcuts(sentence: string): string {
    return sentence.replace('PPUG', 'Power platform user group~');

    // Note: Adding ~ because in next processing is sentence splitted between name and topic
}
