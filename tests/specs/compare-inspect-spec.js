require('./../../src/sign-test')(__filename);

var inspect = require('./../../src/compare').inspect;

describe('inspect', function () {

    function MyObject() {
        this.prop = 1;
    }

    var obj1 = new MyObject(),
        obj2 = {},
        arr1 = new Array(),
        arr2 = [1, 2],
        num1 = 1.092,
        num2 = -56,
        str1 = 'str-1',
        str2 = new String('str-2'),
        fun2 = function mine(y) {};

    var inspectObj1 = inspect(obj1),
        inspectObj2 = inspect(obj2),
        inspectArr1 = inspect(arr1),
        inspectArr2 = inspect(arr2),
        inspectNum1 = inspect(num1),
        inspectNum2 = inspect(num2),
        inspectStr1 = inspect(str1),
        inspectStr2 = inspect(str2),
        inspectFun1 = inspect(function(x) {}),
        inspectFun2 = inspect(fun2);

    console.log(inspectObj1);
    console.log(inspectObj2);

    it('object #1', function () {
        expect(1).toBe(1);
    });
});