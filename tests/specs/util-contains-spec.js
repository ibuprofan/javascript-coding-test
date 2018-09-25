require('./../../src/sign-test')(__filename);

var contains = require('./../../src/util').contains;

describe('contains', function () {

    it('checks if pattern is within string', function () {
        expect(contains('hello world', 'world')).toBe(true);
        expect(contains('my home is my castle', 'my')).toBe(true);
    });
    it('only in string', function () {
        expect(contains('hello world', [])).toBe(false);
        expect(contains({string: 'hello world'}, 'world')).toBe(false);
    });
});