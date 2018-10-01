'use strict';

var trim = require('./util').trim,
    instance = null,
    md5 = require('md5');

function Registry() {

    var _context = '',
        _id = '',
        _data = {},
        _lookup = {},
        _unqcomments = true;

    this.id = function() {
        return (_id === '') ? _id = md5((new Date()).getMilliseconds() + '' + Math.random() + '') :  _id;
    };

    this.reset = function() {
        _context = '';
        _data = {};
        _lookup = {};
        _unqcomments = true;
        return this;
    };

    this.context = function(c) {
        return (typeof c === 'undefined') ? _context : _context = c;
    };

    this.uniqueComments = function(unq) {
        return (typeof unq === 'undefined' || [true, false].indexOf(unq) === -1) ? _unqcomments : _unqcomments = unq;
    };

    this.sign = function(k) {
        return md5(trim(''+k).toLocaleUpperCase());
    };

    this.set = function(k, v) {
        var s = this.sign(k);
        _lookup[s] = k;
        if (typeof _lookup[s] !== 'undefined' && _unqcomments === true) {
            throw new Error('Assertion label already exists: ' + k);
        }
        _data[s] = v;
        return this;
    };

    this.get = function(k) {

        var undef;
        return (!_lookup[this.sign(k)]) ? undef : _data[this.sign(k)];
    }
}

if (instance === null) {
    instance = (new Registry()).reset();
    instance.id();
}

module.exports = instance;
