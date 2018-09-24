require('./../../src/sign-test')(__filename);

var undef, isPrimitive = require('./../../src/assert').isPrimitive;

describe('implements', function () {

    it('isPrimitive() detecting Primitives', function () {
        expect(isPrimitive(null)).toBe(true);
        expect(isPrimitive(false)).toBe(true);
        expect(isPrimitive(true)).toBe(true);
        expect(isPrimitive(undef)).toBe(true);
        expect(isPrimitive(1346)).toBe(true);
        expect(isPrimitive('1346')).toBe(true);
        expect(isPrimitive('this is a string')).toBe(true);
    });

    it('isPrimitive() is also detecting non Primitives', function () {
        expect(isPrimitive({hello: 'world'})).toBe(false);
        expect(isPrimitive([1, 3, {me: 'here'}])).toBe(false);
        expect(isPrimitive(function () {})).toBe(false);
    });

});

