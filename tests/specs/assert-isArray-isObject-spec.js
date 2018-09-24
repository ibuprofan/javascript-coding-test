require('./../../src/sign-test')(__filename);

var isArray = require('./../../src/assert').isArray,
    isObject = require('./../../src/assert').isObject;

describe('implements isArray() ', function () {

    it('detecting non-arrays', function () {
        expect(isArray(null)).toBe(false);
        expect(isArray(false)).toBe(false);
        expect(isArray(true)).toBe(false);
        expect(isArray({one: 1})).toBe(false);
    });

    it('also detecting bona fide arrays', function () {
        expect(isArray([{obj: 'first'}])).toBe(true);
        expect(isArray([1, 2, 4, 8, 16])).toBe(true);
        var arr = new Array();
        arr.push(1);
        arr.push(2);
        arr.push(4);
        arr.push(8);
        arr.push(16);
        expect(isArray(arr)).toBe(true);
        expect(JSON.stringify(arr)).toBe(JSON.stringify([1, 2, 4, 8, 16]));
    });

});

describe('implements isObject() ', function () {

    it('detecting non-objects', function () {
        expect(isObject(null)).toBe(false);
        expect(isObject(false)).toBe(false);
        expect(isObject(true)).toBe(false);
        expect(isObject([1, 2, 3])).toBe(false);
    });

    it('also detecting bona fide objects', function () {
        expect(isObject({collection: [1, 2, 4, 8, 16]})).toBe(true);
        function MyObject() {
            this.collection = [1, 2, 4, 8, 16];
        };
        expect(isObject(new MyObject())).toBe(true);
        expect(JSON.stringify(new MyObject())).toBe(JSON.stringify({collection: [1, 2, 4, 8, 16]}));
    });

});

