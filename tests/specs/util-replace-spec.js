require('./../../src/sign-test')(__filename);

var replace = require('./../../src/util').replace;

describe('replace', function () {

    it('one string with target', function () {
        expect(replace('csv,line,with,separator,changed', ',', '\t')).toBe('csv\tline\twith\tseparator\tchanged');
    });
    it('multiple strings with target', function () {
        expect(replace('garbled string;gets normalized\tto spaces:only', [',', '\t', ':', ';'], ' ')).toBe('garbled string gets normalized to spaces only');
    });

    it('if any of the parameters is not suitable for replace original input is returned', function () {
        expect(JSON.stringify(replace({string: 'here\tto\tswap'}, '\t', ' '))).toBe(JSON.stringify({string: 'here\tto\tswap'}));
        expect(replace('here\tto\tswap', '\t', [])).toBe('here\tto\tswap');
        expect(replace('here\tto\tswap', {object: true}, ' ')).toBe('here\tto\tswap');
    });


});