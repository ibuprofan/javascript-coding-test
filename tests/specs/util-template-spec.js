require('./../../src/sign-test')(__filename);

var template = require('./../../src/util').template;

describe('template', function () {

    it('populates values', function () {
        expect(template(
            'Type mismatch [master] {master} != [input] {input}',
            { master: 'object', input: 'array' })).toBe('Type mismatch [master] object != [input] array');
    });
});