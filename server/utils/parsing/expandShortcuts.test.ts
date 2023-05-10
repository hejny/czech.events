import { expandShortcuts } from './expandShortcuts';

describe('how expanding shortcuts works', () => {
    it('expands', () => {
        expect(expandShortcuts('PPUG: abc')).toEqual('Power platform user group ~: abc');
    });

    it('does nothing when no shortcut present', () => {
        expect(expandShortcuts('Foo')).toEqual('Foo');
    });
});
