require('./../../src/sign-test')(__filename);

var assertResult = require('./../../src/assert').Result;

describe('implements', function () {

    it('factory as a function assertResult()', function () {
        expect(typeof assertResult).toBe('function');
        expect(typeof assertResult()).toBe('object');
        expect(assertResult().constructor.name).toBe('AssertResult');
    });

    it('generic object and JSON getter', function () {
        expect(typeof assertResult().toObject()).toBe('object');
        expect(typeof assertResult().toJSON()).toBe('string');
    });

});

