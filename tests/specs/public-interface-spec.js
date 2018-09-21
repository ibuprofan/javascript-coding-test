require('./../../src/sign-test')(__filename);

var mymodule = require('./../../index');

//console.log(mymodule);

xdescribe('implements interface of', function () {

    it('mymodule.version()', function () {
        expect(typeof mymodule.version).toBe('function');
        expect(typeof mymodule.version()).toBe('0.0.1'); // current version
    });
    it('mymodule.assertEqual()', function () {
        expect(typeof mymodule.assertEqual).toBe('function');
        expect(typeof mymodule.assertEqual()).toBe('Object'); // AssertResult
    });
    it('mymodule.runAll()', function () {
        expect(typeof mymodule.runAll).toBe('function');
        expect(typeof mymodule.runAll()).toBe('Object'); // Array
    });
});
