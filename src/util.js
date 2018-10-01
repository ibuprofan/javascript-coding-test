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
 * Fills string left-hand side with a given string (of length =1)
 * @param {string} str
 * @param {integer} length
 * @param {string} fill
 *
 * @return {string}
 */
function lpad(str, length, fill) {
    return (str+'').padStart(parseInt(length), trim(''+fill).substr(0, 1));
}

/**
 * Fills string right-hand side with a given string (of length =1)
 * @param {string} str
 * @param {integer} length
 * @param {string} fill
 *
 * @return {string}
 */
function rpad(str, length, fill) {
    return (str+'').padEnd(parseInt(length), trim(''+fill).substr(0, 1));
}


/**
 * Pulls highest numeric value out of array
 * @param (array) arr
 *
 * @returns {number|null}
 */
function highest(arr) {
    var val = -9007199254740991;
    if (!Array.isArray(arr) || arr.length === 0) {
        return null;
    }
    arr.forEach(function (el) {
        if (typeof el === 'number' && el > val) val = el;
    });
    return val;
}

/**
 * Pulls lowest numeric value out of array
 * @param (array) arr
 *
 * @returns {number|null}
 */
function lowest(arr) {
    var val = 9007199254740991;
    if (!Array.isArray(arr) || arr.length === 0) {
        return null;
    }
    arr.forEach(function (el) {
        if (typeof el === 'number' && el < val) val = el;
    });
    return val;
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

/**
 * Turns strign with placeholders into populated string
 * e.g. 'Type mismatch [master] {master} != [input] {input}'
 *      {master: 'object', input: 'array'}
 *      into
 *      'Type mismatch [master] object != [input] array'
 *
 * @param {string} string Template
 * @param {params} values K=>V pairs
 *
 * @returns {string}
 */
function template(string, values) {
    string = replace(string, ['{'], '\n:');
    string = replace(string, ['}'], '\n');
    var out = [], chunks = string.split('\n');
    chunks.forEach(function(el) {
        if (trim(el).substr(0, 1) === ':') {
            el = trim(el.substr(1, (el.length-1)));
            if (values[el]) {
                out.push(values[el]);
            }
        } else {
            out.push(el);
        }
    });
    return out.join('');
}

module.exports = {
    nvl: nvl,
    trim: trim,
    contains: contains,
    occurences: occurences,
    replace: replace,
    highest: highest,
    lowest: lowest,
    lpad: lpad,
    rpad: rpad,
    template: template
};
