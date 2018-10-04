require('./../../src/sign-test')(__filename);


if (!String.prototype.contains){
    String.prototype.contains = function(str) {
        return ''+this.indexOf(str) != -1;
    };
}

function MockConsole () {
    var _string = '';
    this.captured = function() {
        return _string;
    };
    this.log = function(input) {
        return _string = input;
    };
}

var mockConsole = new MockConsole();

// md5sum ../props/test.js = '058eb02dfd08e347c40ae14e9f2e4600'
require('./../../src/sign-test')(__dirname+'/../props/test.js', mockConsole);

describe('console can be injected', function () {
    it('string contains a valid MD5', function () {
        expect(mockConsole.captured().contains('058eb02d-fd08e347-c40ae14e-9f2e-4600')).toBe(true);
    });
});
