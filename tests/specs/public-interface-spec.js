require('./../../src/sign-test')(__filename);

var mymodule = require('./../../index');

//console.log(mymodule);

describe('implements interface of', function () {

    it('mymodule.version()', function () {
        expect(typeof mymodule.version).toBe('function');
        expect(mymodule.version()).toBe('0.0.1'); // current version
    });

    it('mymodule.assert', function () {
        expect(typeof mymodule.assert).toBe('Object');
        expect(typeof mymodule.assert.Result).toBe('function');
        expect(typeof mymodule.assert.isArray).toBe('function');
        expect(typeof mymodule.assert.isObject).toBe('function');
        expect(typeof mymodule.assert.isPrimitive).toBe('function');
        expect(typeof mymodule.assert.equals).toBe('function');
    });

    it('mymodule.test()', function () {
        expect(typeof mymodule.test).toBe('function');
    });

    it('mymodule.runAll()', function () {
        expect(typeof mymodule.runAll).toBe('function');
        expect(typeof mymodule.runAll()).toBe('Object'); // Array
    });

});
