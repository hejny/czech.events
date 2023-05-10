export function capitalizeFirstLetter(word: string): string {
    return (word.substr(0, 1).toUpperCase() + word.substr(1)).replace(/^IOS/, 'iOS');
}

/**
 * TODO: Unduplicate from src/
 */
