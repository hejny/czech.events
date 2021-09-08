import { removeCity } from './removeCity';

describe('how removing city works', () => {
    it('remove cities', () => {
        expect(removeCity('Frontendisti Praha')).toEqual('Frontendisti');
        expect(removeCity('Frontendisti v Praze')).toEqual('Frontendisti');
        expect(removeCity('Frontendisti in Prague')).toEqual('Frontendisti');
        expect(removeCity('FuckUp Night Prague')).toEqual('FuckUp Night');
    });
    
    it('dont remove unknown names', () => {
        expect(removeCity('Frontendisti v hospodě')).toEqual('Frontendisti v hospodě');
        expect(removeCity('Frontendisti in the pub')).toEqual('Frontendisti in the pub');
    });

    it('dont cities which are part of the name', () => {
        expect(removeCity('HackPrague')).toEqual('HackPrague');
        expect(removeCity('HackBrno')).toEqual('HackBrno');
        expect(removeCity('Olomouconference')).toEqual('Olomouconference');
    });
});
