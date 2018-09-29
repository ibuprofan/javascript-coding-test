require('./../../src/sign-test')(__filename);

var fs = require('fs'),
    assertsEquals = require('./../../src/assert').assertsEquals;

describe('assertsEquals', function () { // --------------------------

    it('primitives: number, boolean, string, undefined, symbol', function () {

        expect(assertsEquals(true, true, [])).toBe(true);
        expect(assertsEquals(true, false, [])).toBe(false);

        expect(assertsEquals(null, null, [])).toBe(true);
        expect(assertsEquals(null, true, [])).toBe(false);

        expect(assertsEquals(123, 123, [])).toBe(true);
        expect(assertsEquals('123', 123, [])).toBe(true);
        expect(assertsEquals('123', 123.00, [])).toBe(true);
        expect(assertsEquals('123.00', 123.00, [])).toBe(true);
        expect(assertsEquals('123.01', 123.01, [])).toBe(true);

        expect(assertsEquals('ABC', 'ABC', [])).toBe(true);

        expect(assertsEquals([], 'ABC', [])).toBe(false);
        expect(assertsEquals({one: 1}, 'ABC', [])).toBe(false);

        expect(assertsEquals('abc', [], [])).toBe(false);
        expect(assertsEquals('abc', {one: 1}, [])).toBe(false);

    });

    it('Arrays - straight case', function () { // --------------------------
        expect(assertsEquals(
                [1,2,30],
                [1, 2, 30],
                []
            )
        ).toBe(true);
    });

    it('Array - expected', function () {
        var errCollection1 = [],
            result1 = assertsEquals(
                [1],
                [1, 2, 30],
                errCollection1
            );

        expect(result1).toBe(false);
        expect(JSON.stringify(errCollection1)).toBe(JSON.stringify(['@TODO: Compare arrays']));
    });

    it('Object - straight case', function () { // --------------------------
        expect(assertsEquals(
                {collection: [1,2,30]},
                {collection: [1, 2, 30]},
                []
            )
        ).toBe(true);
    });

    it('Object - expected', function () {
        var errCollection2 = [],
            result2 = assertsEquals(
                {two: 2},
                [2],
                errCollection2
            );

        expect(result2).toBe(false);
        expect(JSON.stringify(errCollection2)).toBe(JSON.stringify(['@TODO: Compare objects']));
    });

    it('Non primitive (not Array and not Object)', function () { // --------------------------
        var errCollection3 = [],
            result3 = assertsEquals(
                fs.readFileSync(__filename),
                [2],
                errCollection3
            );

        expect(result3).toBe(false);
        expect(JSON.stringify(errCollection3)).toBe(JSON.stringify(['@TODO: Compare objects']));
    });

});
