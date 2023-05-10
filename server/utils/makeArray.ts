export function makeArray<T>(input: T | T[] | undefined) {
    if (input === undefined) {
        return [];
    } else if (input instanceof Array) {
        return input;
    } else {
        return [input];
    }
}
