require('./../../src/sign-test')(__filename);

var typeMatch = require('./../../src/compare').typeMatch;

describe('typeMatch', function () {

    it('typeMatch true', function () {
        var errors = [];
        expect(typeMatch({}, {}, errors)).toBe(true);
        expect(errors.length).toBe(0);
    });

    it('typeMatch false', function () {
        var errors2 = [];
        expect(typeMatch({}, [], errors2)).toBe(false);
        expect(errors2.length).toBe(1);
        expect(errors2[0]).toBe('Type mismatch [expected] object:__anonymous__ is NOT [input] array:Array');
    });

    it('typeMatch false #2', function () {
        var errors3 = [];
        expect(typeMatch({}, 123.09, errors3)).toBe(false);
        expect(errors3.length).toBe(1);
        expect(errors3[0]).toBe('Type mismatch [expected] object:__anonymous__ is NOT [input] number');
    });

});