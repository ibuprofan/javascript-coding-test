'use strict';

var md5 = require('md5');

function Result() {

    var _self = this,
        _id = '';

    this.message = '';
    this.expected = '';
    this.given = '';
    this.status = '';
    this.result = '';
    this.errors = [];
    this.assertion = '';

    /**
     * Setter / getter
     * @returns {string|Result}
     */
    this.id = function() {
        if (_id === '') {
            _id = md5((new Date()).getMilliseconds() + '' + Math.random() + '');
            return this;
        }
        return _id;
    };

    this.set = function(key, value) {
        if (typeof this[key] !== 'undefined') {
            this[key] = value;
        }
        return this;
    };

    this.get = function(key) {
        var notfound;
        if (typeof this[key] !== 'undefined') {
            return this[key];
        }
        return notfound;
    };


    this.execute = function() {

        if (typeof this.assertion === 'function') {
            try {

                this.result = this.assertion(this.given, this.actual); // any non exception execution is = true

            } catch (err) {

                this.result = false; // fail
                this.errors.push(
                    err.message // error messages are generated from within assertion function
                );
            }
        } else {

            this.result = false;
            this.errors.push('No assertion function of agreed interface provided.');
        }
        return this;
    };

    /**
     * Makes a copy not reference and shortlist of non-function properties
     *
     * @return {Object}
     */
    this.toObject = function() {
        var keys = Object.keys(this), // @TODO: Test with older browser and make...
            out = {
                id: this.id()
            };

        keys.forEach(function(k) {    // @TODO: ...a polyfill/shim for it if required
            if (['undefined', 'function'].indexOf(typeof _self[k]) === -1) {
                out[k] = _self[k];
            }
        });
        out['assertion'] = (typeof this.assertion === 'function')
            ? 'function:'+ ((this.assertion.name.length < 1) ? '__anonymous__' : this.assertion.name)
            : 'invalid-value';

        return out;
    };

    this.toJSON = function() {
        return JSON.stringify(this.toObject());
    };
}

/**
 * Factory Result
 * @returns {Result}
 */
function resultFactory() {
    return (new Result()).id();
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

/**
 * Assert equals
 *
 * @param {mixed} expected Expected value
 * @param {mixed} actual   Given value (actual)
 * @param (Array) errors   Errors gathered
 *
 * @returns {boolean}
 */
function assertsEquals(expected, actual, errors) {
    if (isPrimitive(expected) === true) {
        return isPrimitive(actual) ? actual === expected || (''+actual).valueOf() === (''+expected).valueOf() : false;
    } else {
        if (JSON.stringify(expected) === JSON.stringify(actual)) {
            return true; // simple 1:1 case - Array or Object
        } else {
            try {
                if (Array.isArray(expected) === true) {
                    throw new Error('@TODO: Compare arrays');
                } else if (typeof expected === 'object') {
                    throw new Error('@TODO: Compare arrays');
                } else {
                    throw new Error('@TODO: Compare ' + (typeof expected));
                }
            } catch (err) {
                if (Array.isArray(errors)) errors.push(err.message);
                return false;
            }
        }
    }
}

module.exports = {

    Result: resultFactory,
    isArray: isArray,
    isObject: isObject,
    isPrimitive: isPrimitive,
    assertsEquals: assertsEquals
};
