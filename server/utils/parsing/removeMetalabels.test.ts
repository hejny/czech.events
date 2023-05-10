import { removeMetalabels } from './removeMetalabels';

describe('how removing meta-labels works', () => {
    it('remove meta-labels', () => {
        expect(removeMetalabels('Frontendisti online stream')).toEqual('Frontendisti');
        // TODO: more
    });

    it('remove meta-labels in some wrap', () => {
        expect(removeMetalabels('[ONLINE] PPUG Setkání a povídání')).toEqual('[] PPUG Setkání a povídání');
        // TODO: more
    });
});
