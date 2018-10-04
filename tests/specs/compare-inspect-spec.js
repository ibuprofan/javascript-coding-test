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
        inspectFun1 = inspect(function(x) { return 1; }),
        inspectFun2 = inspect(fun2);

    it('object #1', function () {
        expect(inspectObj1.md5).toBe('85355E14EF31949E860FBE30F980AE09');
        expect(inspectObj1.type).toBe('object');
        expect(inspectObj1.name).toBe('MyObject');
        expect(inspectObj1.value).toBe(obj1);
    });
    it('object #2', function () {
        expect(inspectObj2.md5).toBe('477BD670043AAB6EA18F3EB87AB8E3B3');
        expect(inspectObj2.type).toBe('object');
        expect(inspectObj2.name).toBe('__anonymous__');
        expect(inspectObj2.value).toBe(obj2);
    });


    it('array #1', function () {
        expect(inspectArr1.md5).toBe('042668DD69BB971F2CFCDEC8C3FC9005');
        expect(inspectArr1.type).toBe('array');
        expect(inspectArr1.name).toBe('Array');
        expect(inspectArr1.value).toBe(arr1);
    });
    it('array #2', function () {
        expect(inspectArr2.md5).toBe('E1AC349F086EA0BFCAA466F7BF89791A');
        expect(inspectArr2.type).toBe('array');
        expect(inspectArr2.name).toBe('Array');
        expect(inspectArr2.value).toBe(arr2);
    });


    it('number #1', function () {
        expect(inspectNum1.md5).toBe('38EC1321F88121AFB7536007EF080241');
        expect(inspectNum1.type).toBe('number');
        expect(inspectNum1.name).toBe(null);
        expect(inspectNum1.value).toBe(num1);
    });
    it('number #2', function () {
        expect(inspectNum2.md5).toBe('C19E9462B1965238464646EFC12DB8C8');
        expect(inspectNum2.type).toBe('number');
        expect(inspectNum2.name).toBe(null);
        expect(inspectNum2.value).toBe(num2);
    });


    it('string #1', function () {
        expect(inspectStr1.md5).toBe('7B28EC53667F7A25F6D352AE3A3482AD');
        expect(inspectStr1.type).toBe('string');
        expect(inspectStr1.name).toBe(null);
        expect(inspectStr1.value).toBe(str1);
    });
    it('string #2', function () {
        expect(inspectStr2.md5).toBe('2B275A54B3EB0704195155BB6417A5EA');
        expect(inspectStr2.type).toBe('object');
        expect(inspectStr2.name).toBe('String');
        expect(inspectStr2.value).toBe(str2);
    });


    it('function #1', function () {
        expect(inspectFun1.md5).toBe('99914B932BD37A50B983C5E7C90AE93B');
        expect(inspectFun1.type).toBe('function');
        expect(inspectFun1.name).toBe('__anonymous__');
        expect(typeof inspectFun1.value).toBe(typeof function(x) { return 1; });
    });
    it('function #2', function () {
        expect(inspectFun2.md5).toBe('99914B932BD37A50B983C5E7C90AE93B');
        expect(inspectFun2.type).toBe('function');
        expect(inspectFun2.name).toBe('mine');
        expect(inspectFun2.value).toBe(fun2);
    });

});