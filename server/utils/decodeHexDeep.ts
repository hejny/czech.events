import { decodeHex } from './decodeHex';

// TODO: Universal deep apply and this only as bind of it
export function decodeHexDeep<T>(input: T): T {
    if (typeof input === 'object') {
        if (Array.isArray(input)) {
            return input.map((item: any) => decodeHexDeep(item)) as any;
        } else {
            const converted: T = {} as T;
            for (const key in input) {
                converted[key] = decodeHexDeep(input[key] as any);
            }
            return converted;
        }
    } else if (typeof input === 'string') {
        return decodeHex(input) as any;
    } else {
        return input;
    }
}
