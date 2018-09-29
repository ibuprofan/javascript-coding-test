require('./../../src/sign-test')(__filename);

var highest = require('./../../src/util').highest,
    lowest  = require('./../../src/util').lowest;

describe('highest', function () {

    it('value found', function () {
        expect(highest([10, 14.14, 67.0, 99, 123.65])).toBe(123.65);
    });

    it('ignores non-numerics', function () {
        expect(lowest([[-900], -10, {}, 14.14, [], 67.0, 99, 123.65])).toBe(-10);
    });

});

describe('lowest', function () {

    it('value found', function () {
        expect(lowest([-10, 14.14, 67.0, 99, 123.65])).toBe(-10);
    });

    it('ignores non-numerics', function () {
        expect(lowest(['bzz', '-6000', -10, 14.14, 67.0, 99, 123.65])).toBe(-10);
    });

});

