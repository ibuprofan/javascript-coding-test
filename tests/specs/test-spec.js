require('./../../src/sign-test')(__filename);

var test = require('./../../src/test');

describe('test()', function () {

    it('executed test OK', function () {
        var resultOk = test(
            'Compare two string',
            'ABC',
            'ABC',
            function(g, a) {
                if (g !== a) {
                    throw new Error('not equal');
                }
                return true;
            }
        );
        expect(resultOk.get('result')).toBe(true);
    });

    it('failed test', function () {
        var resultFail = test(
            'Compare two string',
            'ABC',
            'DIFFERENT',
            function(g, a) {
                if (g === a) return true;
                throw new Error('Custom error');
            }
        );
        expect(resultFail.get('result')).toBe(false);
        expect(JSON.stringify(resultFail.get('errors'))).toBe(JSON.stringify(['Custom error']));
    });
});
