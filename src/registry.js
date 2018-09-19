'use strict';

var instance = null,
    md5 = require('md5');

function Registry() {

  var _context = '',
      _id = '';
      _data = {},
      _unqcomments = true;

  this.id = function() {
      if (_id === '') {
          _id = md5((new Date()).getMilliseconds() + '' + Math.random() + '');
      }
      return _id;
  };

  this.reset = function() {
    _context = '';
    _data = '';
    _unqcomments = true;
    return this;
  };

  this.uniqueComments = function(unq) {
     return (!unq || [true, false].indexOf(unq) === -1)
            ? _unqcomments
            : _unqcomments = unq;
  };

  this.set = function(k, v) {
    if (typeof _data[k] !== 'undefined' && _unqcomments === true) {
      throw new Error('Assertion label already exists: ' + k);
    }
    _data[k] = v;
    return this;
  };

}

if (instance === null) {
  instance = (new Registry()).reset();
}

module.exports = instance;
