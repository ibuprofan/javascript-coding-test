require('./../../src/sign-test')(__filename);

var test = require('./../../src/test');

describe('test()', function () {

    it('executed test OK', function () {
        var resultOk = test(
            'Compare two string',
            'ABC',
            'ABC',
            function(g, a) {
                console.log('G: '+g)
                console.log('A: '+a)
                return g === a;
            }
        );
        console.log(resultOk);
        expect(resultOk.get('result')).toBe(true);
    });

    it('failed test', function () {
        var resultFail = test(
            'Compare two string',
            'ABC',
            'ABC',
            function(g, a) {
                console.log('G2: '+g)
                console.log('A2: '+a)
                if (g === a) return true;
                throw new Error('Custom error');
            }
        );
        expect(resultFail.get('result')).toBe(false);
        expect(JSON.stringify(resultFail.get('errors'))).toBe(JSON.stringify(['Custom error']));
    });
});
