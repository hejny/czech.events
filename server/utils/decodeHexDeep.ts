import { decodeHex } from './decodeHex';

// TODO: Universal deep apply and this only as bind of it
export function decodeHexDeep<T extends object>(input: T): T {
    const converted: T = {} as T;
    for (const key in input) {
        if (typeof input[key] === 'object') {
            converted[key] = decodeHexDeep(input[key] as any);
        } else if (typeof input[key] === 'string') {
            converted[key as any] = decodeHex(input[key] as any);
        } else {
            converted[key] = input[key];
        }
    }
    return converted;
}
