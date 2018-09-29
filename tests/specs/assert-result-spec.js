require('./../../src/sign-test')(__filename);

var resultFactory = require('./../../src/assert').Result;

describe('implements', function () {

    it('factory as a function resultFactory()', function () {
        expect(typeof resultFactory).toBe('function');
        expect(typeof resultFactory()).toBe('object');
        expect(resultFactory().constructor.name).toBe('Result');
    });

    it('generic object and JSON getter', function () {
        expect(typeof resultFactory().toObject()).toBe('object');
        expect(typeof resultFactory().toJSON()).toBe('string');
    });


    it('only predefined properties can be set (prior to assertion)', function () {

        function myAssertion(expected, actual) {
            if (expected === actual) return true;
            throw new Error('expected not equals actual');
        }

        var result = resultFactory()
                .set('message', 'This is test/assertion description')
                .set('expected', 'EXPECT')
                .set('given', 'VALUE')
                .set('blah', 'this will not be set') // key that is not declared is not set
                .set('assertion', function(g, a) {
                    return g === a;
                }),
            exportedObject1 = result.toObject(),
            exportedObject2 = result.set('assertion', myAssertion).toObject();

        // using anonymous
        expect(exportedObject1.id).toBe(result.id()); // forked from the same object
        expect(exportedObject1.message).toBe('This is test/assertion description');
        expect(exportedObject1.expected).toBe('EXPECT');
        expect(exportedObject1.given).toBe('VALUE');
        expect(exportedObject1.assertion).toBe('function:__anonymous__');
        expect(typeof exportedObject1['blah']).toBe('undefined'); // under no condition is non-declared key value set

        // after function reset to non-anonymous
        expect(exportedObject2.id).toBe(result.id()); // forked from the same object
        expect(exportedObject2.message).toBe('This is test/assertion description');
        expect(exportedObject2.expected).toBe('EXPECT');
        expect(exportedObject2.given).toBe('VALUE');
        expect(exportedObject2.assertion).toBe('function:myAssertion');
        expect(typeof exportedObject2['blah']).toBe('undefined'); // under no condition is non-declared key value set

        result.execute(); // exec on original object

        expect(result.get('result')).toBe(false); // not equal, assertion failed
        expect(JSON.stringify(result.get('errors'))).toBe(JSON.stringify(['expected not equals actual']));

    });

    it('detects assertion function not passed', function () {

        var resultErr = resultFactory()
            .set('message', 'This is test/assertion description')
            .set('expected', 'EXPECT')
            .set('given', 'VALUE')
            .set('blah', 'this will not be set') // key that is not declared is not set
            .set('assertion', 'thisIsNotAFunction()')
            .execute();

        expect(resultErr.get('result')).toBe(false);
        expect(JSON.stringify(resultErr.get('errors'))).toBe(JSON.stringify(['No assertion function of agreed interface provided.']));

        expect(typeof resultErr.get('doesNotExist')).toBe('undefined');
    });

});

