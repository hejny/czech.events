import { decodeHex } from './decodeHex';

describe('how decoding hex unicode chars works', () => {
    it('can decode hex unicode char', () => {
        expect(decodeHex(`&#xFD;`)).toEqual('ý');
        // TODOexpect(`%u011B`).toEqual('ě');
    });

    it('can decode hex unicode char in a world', () => {
        expect(decodeHex(`hust&#xFD;`)).toEqual('hustý');
    });

    it('can decode hex unicode chars', () => {
        // TODO: More
        expect(decodeHex(`&#x10C;&#xFD;x`)).toEqual('Čýx');
    });
});
