import { makeArray } from './makeArray';

describe('how makeArray works', () => {
    it('can makeArray from undefined', () => {
        expect(makeArray(undefined)).toEqual([]);
    });

    it('can makeArray from item', () => {
        expect(makeArray(1)).toEqual([1]);
    });

    it('can makeArray from array', () => {
        expect(makeArray([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('can makeArray from object item', () => {
        expect(makeArray({ a: 1 })).toEqual([{ a: 1 }]);
    });

    it('can makeArray from array of objects', () => {
        expect(makeArray([{ a: 1 }, { b: 2 }, { c: 3 }])).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
    });
});
