'use strict';

var color = require('bash-color');

module.exports = function signTests(testfile, cnsl) {
    cnsl = (typeof cnsl === 'undefined') ? console : cnsl;
    if (!Array.prototype.last) Array.prototype.last = function() {
        return this[this.length - 1];
    };
    cnsl.log(
        'MD5: ' +
        color.wrap(require('md5-file').sync(testfile), color.colors.BLUE, color.styles.bold) +
        ' File: ' +
        color.wrap(testfile.split(testfile.indexOf('/')<0 ? '\\' : '/').last(), color.colors.PURPLE, color.styles.bold)
    );
    return;
};
