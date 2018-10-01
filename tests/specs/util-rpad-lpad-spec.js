require('./../../src/sign-test')(__filename);

var lpad = require('./../../src/util').lpad,
    rpad  = require('./../../src/util').rpad;

describe('lpad', function () {

    it('adds padding to the left', function () {
        expect(lpad('AB', 8, '0')).toBe('000000AB');
    });
    it('adds padding to the left - ignores when more than 1 char of padding', function () {
        expect(lpad('AB', 8, '0GHGSJHS')).toBe('000000AB');
    });

});

describe('rpad', function () {

    it('adds padding to the left', function () {
        expect(rpad('AB', 8, '_')).toBe('AB______');
    });
    it('adds padding to the left - ignores when more than 1 char of padding', function () {
        expect(rpad('AB', 8, '_GHGSJHS')).toBe('AB______');
    });

});