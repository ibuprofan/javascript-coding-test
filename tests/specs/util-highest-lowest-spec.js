require('./../../src/sign-test')(__filename);

var highest = require('./../../src/util').highest,
    lowest  = require('./../../src/util').lowest;

describe('highest', function () {

    it('value found', function () {
        expect(highest([10, 14.14, 67.0, 99, 123.65])).toBe(123.65);
    });

    it('ignores non-numerics', function () {
        expect(highest([[-900], -10, {}, 14.14, [], 67.0, 99, 123.65])).toBe(123.65);
    });

    it('ignores non-array input', function () {
        expect(highest({})).toBe(null);
        expect(highest([])).toBe(null);
        expect(highest(123)).toBe(null);
        expect(highest('ABBDBBD')).toBe(null);
    });

});

describe('lowest', function () {

    it('value found', function () {
        expect(lowest([-10, 14.14, 67.0, 99, 123.65])).toBe(-10);
    });

    it('ignores non-numerics', function () {
        expect(lowest(['bzz', '-6000', -10, 14.14, 67.0, 99, 123.65])).toBe(-10);
    });

    it('ignores non-array input', function () {
        expect(lowest({})).toBe(null);
        expect(lowest([])).toBe(null);
        expect(lowest(123)).toBe(null);
        expect(lowest('ABBDBBD')).toBe(null);
    });

});

