import { findItemsWithBiggestQuantity } from './findItemsWithBiggestQuantity';

describe('how finding items with biggest quantity in the array works', () => {
    it(`works with certain winner`, async () => {
        expect(findItemsWithBiggestQuantity([1, 1, 2])).toEqual([1]);
        expect(findItemsWithBiggestQuantity([1, 1, 2, 2, 2])).toEqual([2]);
    });

    it(`works with draw`, async () => {
        expect(findItemsWithBiggestQuantity([1, 2])).toEqual([1, 2]);
        expect(findItemsWithBiggestQuantity([1, 1, 2, 2])).toEqual([1, 2]);
        expect(findItemsWithBiggestQuantity([1, 3, 1, 2, 2, 3])).toEqual([1, 3, 2]);
        expect(findItemsWithBiggestQuantity([4, 1, 3, 1, 2, 4, 2, 3])).toEqual([4, 1, 3, 2]);
    });

    it(`works with zero cases`, async () => {
        expect(findItemsWithBiggestQuantity([])).toEqual([]);
    });
});
