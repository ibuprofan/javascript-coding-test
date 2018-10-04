require('./../../src/sign-test')(__filename);

var normalizeArray = require('./../../src/compare').normalize.array,
    normalizeObject = require('./../../src/compare').normalize.object;

describe('normalizeArray', function () {

    it('normalize.array', function () {
        expect(1).toBe(1);
    });

});

describe('normalizeObject', function () {

    it('normalize.object', function () {
        expect(1).toBe(1);
    });

});
