'use strict';


function AssertResult() {

    var _self = this;

    this.message = '';
    this.expected = '';
    this.given = '';
    this.status = '';
    this.result = '';
    this.errors = [];

    this.set = function(key, value) {
        if (typeof this[key] !== 'undefined') {
            this[key] = value;
        }
        return this;
    };

    this.toObject = function() {
        var out = {}, keys = Object.keys(this); // @TODO: Test with older browser and make
        keys.forEach(function(k) {              // @TODO: polyfill/shim for it if required
            if (['undefined', 'function'].indexOf(typeof _self[k]) === -1) {
                out[k] = _self[k];
            }
        });
        //console.log(out);
        return out;
    };

    this.toJSON = function() {
        return JSON.stringify(this.toObject());
    };
}

function resultFactory() {
    return new AssertResult();
}

function isPrimitive(subject) {
    return (['number', 'boolean', 'string', 'undefined', 'symbol'].indexOf(typeof subject)>-1 || null === subject);
}

function isArray(subject) {
    return !isPrimitive(subject) && subject instanceof Array;
}

function isObject(subject) {
    return !isPrimitive(subject) && !isArray(subject) && typeof subject === 'object';
}




module.exports = {

    Result: resultFactory,
    isArray: isArray,
    isObject: isObject,
    isPrimitive: isPrimitive

};
