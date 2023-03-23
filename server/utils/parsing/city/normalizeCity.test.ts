import { normalizeCity } from './normalizeCity';

describe('how normalizing of the city works', () => {
    it('normalize existing cities', () => {
        expect(normalizeCity('Praha')).toEqual('Praha');
        expect(normalizeCity('PRG')).toEqual('Praha');
        expect(normalizeCity('Praze')).toEqual('Praha');
        expect(normalizeCity('Brně')).toEqual('Brno');
    });

    it('normalize non-existing cities', () => {
        expect(normalizeCity('Šulínov')).toEqual(null);
    });
});
