import { removeMetalabels } from './removeMetalabels';

describe('how removing meta-labels works', () => {
    it('remove meta-labels', () => {
        expect(removeMetalabels('Frontendisti online stream')).toEqual('Frontendisti');
        // TODO: more
    });
});
