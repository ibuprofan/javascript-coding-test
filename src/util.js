'use strict';


var isPrimitive = require('./assert').isPrimitive,
    config = {
        replaceable: ['number', 'string']
    };

/**
 * NVL no value
 * @param mixed val      If not set
 * @param mixed fallback This one is returned
 * @returns mixed
 */
function nvl(val, fallback) {
    fallback = (typeof fallback === 'undefined') ? null : fallback;
    return (typeof val === 'undefined') ? fallback : val;
}

/**
 * Removes padding spaces or new line characters
 * @param str
 * @returns {string}
 */
function trim(str) {
    return (''+str)
        .replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

/**
 /**
 * Primitive and suitable for contains(), occurences() or replace()
 * @param input
 * @returns {boolean}
 */
function replaceable(input) {
    return isPrimitive(input) && config.replaceable.indexOf(typeof input) > -1;
}

/**
 * Does the string contain the token
 * @param {string} string Long string
 * @param {string} token  Token to find
 * @returns {boolean} Op status
 */
function contains(string, token) {
    if (replaceable(string) && replaceable(token)) {
        return (''+string).indexOf(''+token) > -1; // found at least 1
    }
    return false; // not found
}

/**
 * Counts occurences
 * @param {string} string Source
 * @param {string} token  String to find
 * @returns {number} -1 is error, >-1 is count
 */
function occurences(string, token) {
    if (!replaceable(string) || !replaceable(token)) {
        return -1;
    } else {
        return ((''+string).length - replace(string, token, '').length) / (''+token).length;
    }
}

/**
 * Replace
 * @param {string}       string Replace in
 * @param {string|Array} token  If found
 * @param {string}       to     To new string
 * @return {string}
 */
function replace(string, token, to) {

    try {

        if (!replaceable(string)) throw new Error('Source string invalid');
        if (!replaceable(to)) throw new Error('To string invalid');
        if (!replaceable(token) && !Array.isArray(token)) throw new Error('Pattern string invalid');
        if (!Array.isArray(token)) {
            token = [''+token];
        }

        var err = [];

        token.forEach(function (el) {
            if (replaceable(el)) {
                string = string.replace(new RegExp(''+el, 'g'), (''+to));
            }
        });
        return string;

    } catch (err) {
        return string;
    }
}

module.exports = {
    nvl: nvl,
    trim: trim,
    contains: contains,
    occurences: occurences,
    replace: replace
};
