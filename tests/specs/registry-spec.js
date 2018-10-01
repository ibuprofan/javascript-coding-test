require('./../../src/sign-test')(__filename);

var registry = require('./../../src/registry'),
    registry2 = require('./../../src/registry');

describe('Implements Singleton ', function () {

    it('Object (Registry) class', function () {
        expect(typeof registry).toBe('object');
        expect(typeof registry2).toBe('object');
        expect(registry.constructor.name).toBe('Registry');
        expect(registry2.constructor.name).toBe('Registry');
    });

    it('r.id() is a function and always returns the same id (is the same instance)', function () {
        expect(typeof registry.id).toBe('function');
        expect(typeof registry2.id).toBe('function');
        expect(registry2.id() === registry.id()).toBe(true);
        expect(require('./../../src/registry').id() === registry.id()).toBe(true);
        expect(typeof registry.id()).toBe('string');
        expect(registry.id().length).toBe(32);
    });

    it('r.uniqueComments() hybrid setter and getter in one', function () {
        expect(typeof registry.uniqueComments()).toBe('boolean');
        expect(registry.uniqueComments(true)).toBe(true);
        expect(registry.uniqueComments()).toBe(true);
        expect(registry.uniqueComments(false)).toBe(false);
        expect(registry.uniqueComments()).toBe(false);
    });

    it('r.context() hybrid setter and getter in one', function () {
        expect(typeof registry.context()).toBe('string');
        expect(registry.context('My test suite')).toBe('My test suite');
        expect(registry.context()).toBe('My test suite');
    });

});

describe('Keys pointing at values in K=>V are normalised and hashed with MD5', function () {

    it('Object (Registry) class', function () {
        expect(registry.sign('So we beat on, boats against the current, borne back ceaselessly into the past')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('so we beat on, boats against the current, borne back ceaselessly into the past')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('SO WE BEAT ON, BOATS AGAINST THE CURRENT, BORNE BACK CEASELESSLY INTO THE PAST')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('So We Beat On, Boats Against The Current, Borne Back Ceaselessly Into The Past')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('sO We bEaT On, BoAtS AgAiNsT ThE CuRrEnT, bOrNe bAcK CeAsElEsSlY InTo tHe pAsT')).toBe('ded17a8923b31181df28b94f68cacc37');

        expect(registry.sign('    So we beat on, boats against the current, borne back ceaselessly into the past   ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign(' so we beat on, boats against the current, borne back ceaselessly into the past  ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('  SO WE BEAT ON, BOATS AGAINST THE CURRENT, BORNE BACK CEASELESSLY INTO THE PAST    ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('  So We Beat On, Boats Against The Current, Borne Back Ceaselessly Into The Past  ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('   sO We bEaT On, BoAtS AgAiNsT ThE CuRrEnT, bOrNe bAcK CeAsElEsSlY InTo tHe pAsT     ')).toBe('ded17a8923b31181df28b94f68cacc37');

        expect(registry.sign('So we beat on, boats against the current, borne back ceaselessly into the past   ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('so we beat on, boats against the current, borne back ceaselessly into the past  ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('SO WE BEAT ON, BOATS AGAINST THE CURRENT, BORNE BACK CEASELESSLY INTO THE PAST    ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('So We Beat On, Boats Against The Current, Borne Back Ceaselessly Into The Past  ')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('sO We bEaT On, BoAtS AgAiNsT ThE CuRrEnT, bOrNe bAcK CeAsElEsSlY InTo tHe pAsT     ')).toBe('ded17a8923b31181df28b94f68cacc37');

        expect(registry.sign('   So we beat on, boats against the current, borne back ceaselessly into the past')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('  so we beat on, boats against the current, borne back ceaselessly into the past')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('    SO WE BEAT ON, BOATS AGAINST THE CURRENT, BORNE BACK CEASELESSLY INTO THE PAST')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('  So We Beat On, Boats Against The Current, Borne Back Ceaselessly Into The Past')).toBe('ded17a8923b31181df28b94f68cacc37');
        expect(registry.sign('   sO We bEaT On, BoAtS AgAiNsT ThE CuRrEnT, bOrNe bAcK CeAsElEsSlY InTo tHe pAsT')).toBe('ded17a8923b31181df28b94f68cacc37');
    });


});

describe('Implements interface for  ', function () {

    it('set and get', function () {
        expect(typeof registry.set('my key', 12345)).toBe('object');
        expect(registry.set('my other key', 54321).constructor.name).toBe('Registry');
        expect(registry.get('my key')).toBe(12345);
        expect(registry.get('my other key')).toBe(54321);
    });

    it('key does not exist', function () {
        expect(typeof registry.get('boooo')).toBe('undefined');
    });

    it('safety switch against reundant keys', function () {
        try {
            registry.uniqueComments(true);
            registry.set('my key', 711);
            expect(true).toBe('This should bever be executed');
        } catch (err) {
            expect(err.message).toBe('Assertion label already exists: my key');
        }
    });

});

