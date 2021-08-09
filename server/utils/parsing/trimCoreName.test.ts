import { trimCoreName } from './trimCoreName';

describe('how trimming a core from name works', () => {
    it('trims from begining', () => {
        expect(trimCoreName('%^#*@&Some name')).toEqual('Some name');
        expect(trimCoreName('%^#*@&  Some name')).toEqual('Some name');
        expect(trimCoreName('  %^#*@&Some name')).toEqual('Some name');
        expect(trimCoreName('❤️✨🔥Some name')).toEqual('Some name');
    });

    it('trims from end', () => {
        expect(trimCoreName('Some name%^#*@&')).toEqual('Some name');
        expect(trimCoreName('Some name   %^#*@&  ')).toEqual('Some name');
        expect(trimCoreName('Some name❤️✨🔥')).toEqual('Some name');
    });
});
