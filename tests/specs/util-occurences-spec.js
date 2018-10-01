require('./../../src/sign-test')(__filename);

var occurences = require('./../../src/util').occurences;

describe('occurences', function () {

    it('counts string patter\'s occurences within a string', function () {
        expect(occurences('hello world', 'world')).toBe(1);
        expect(occurences('my home is my castle', 'my')).toBe(2);
        expect(occurences('my home is my castle', 'bzz')).toBe(0);
    });
    it('non-strings are returning -1', function () {
        expect(occurences('hello world', [])).toBe(-1);
        expect(occurences({string: 'hello world'}, 'world')).toBe(-1);
    });
});