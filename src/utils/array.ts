export function shuffleArray<T>(array: T[]): T[] {
    array = [...array];
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function joinArray<T>(array: T[], delimiter: T): T[] {
    const delimitedArray: T[] = [];

    for (const item of array) {
        if (delimitedArray.length) {
            delimitedArray.push(delimiter);
        }
        delimitedArray.push(item);
    }

    return delimitedArray;
}
