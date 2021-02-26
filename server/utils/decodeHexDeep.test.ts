import { decodeHexDeep } from './decodeHexDeep';

describe('how decoding hex unicode chars works', () => {
    it('can decode hex unicode char in object', () => {
        expect(
            decodeHexDeep({
                a: `&#xFD;`,
            }),
        ).toEqual({ a: 'ý' });
    });

    it('can decode hex unicode chars in object', () => {
        expect(
            decodeHexDeep({
                a: `&#x10C;&#xFD;a`,
            }),
        ).toEqual({ a: 'Čýa' });
    });

    it('can decode hex unicode chars in deep object', () => {
        expect(
            decodeHexDeep({
                a: { b: { c: `&#xFD;` } },
            }),
        ).toEqual({
            a: { b: { c: `ý` } },
        });
    });
});
