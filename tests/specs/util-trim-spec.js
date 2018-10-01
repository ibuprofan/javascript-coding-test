require('./../../src/sign-test')(__filename);

var trim = require('./../../src/util').trim;

describe('trim', function () {

    it('removes padding spaces', function () {
        expect(trim('       ASD     ')).toBe('ASD');
        expect(trim('ASD     ')).toBe('ASD');
        expect(trim('       ASD')).toBe('ASD');
    });

});