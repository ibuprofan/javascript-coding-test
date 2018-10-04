'use strict';

var template = require('./util').template,
    md5 = require('md5');


/**
 * Compares arrays
 *
 * @param {Array}  master  Master array
 * @param {Array}  input   Input array
 * @param {Array}  details Details
 * @param {number} depth   Depth indication
 *
 * @returns {boolean} true only if matched
 */
function compareArrays(master, input, details, depth) {
    return false;
}

/**
 * Compares objects
 *
 * @param {Array}  master  Master object
 * @param {Array}  input   Input object
 * @param {Array}  details Details
 * @param {number} depth   Depth indication
 *
 * @returns {boolean} true only if matched
 */
function compareObjects(master, input, details, depth) {
    return false;
}

function normalizeArray(input) {

}

function normalizeObject(input) {

}

/**
 * Gets information on subject passed
 *
 * @param {mixed} subject Subejct to inspect
 * @returns {{md5: {string}, type: (string), name: (string|null), value: {mixed}}}
 */
function inspect(subject) {
    var t = typeof subject,
        r = {
            md5: (md5(JSON.stringify({value: subject}))+'').toLocaleUpperCase(),
            type: (typeof subject),
            name: _getName(subject, t),
            value: subject
        };

    if (r.name === 'Array') {
        r.type = 'array';
    }

    if (r.name === 'Object' && r.type === 'object') {
        r.name = '__anonymous__';
    }

    return r;
}

function _getName(subject, t) {
    if (t === 'function') {
        return (!subject.name || subject.name.length < 1) ? '__anonymous__' : subject.name;
    } else if (t === 'object') {
        return (!subject.constructor || !subject.constructor.name) ? '__anonymous__' : subject.constructor.name;
    } else {
        return null;
    }
}


/**
 * Tries matching types and in case of mismatch returns false
 * and writes details into passed array
 * @param (mixed} e Expected
 * @param (mixed} i Input
 * @param (array} details Errors written into this array
 * @returns {boolean} Status
 */
function typeMatch(e, i, details) {

    var reflection = {
        e: inspect(e),
        i: inspect(i)
    };

    if (reflection.e.type === reflection.i.type && reflection.e.name === reflection.i.name) return true;

    if (Array.isArray(details)) {
        details.push(
            template(
                'Type mismatch [expected] {expected} is NOT [input] {input}',  // todo master.prop
                {
                    input: mergeWords([reflection.i.type, reflection.i.name], ':'),
                    expected: mergeWords([reflection.e.type, reflection.e.name], ':')
                }
            )
        );
    }
    return false;
}

function mergeWords(words, join) {
    var out = [];
    words.forEach(function (el) {
        if (null !== el) out.push(el+'');
    });
    return (out.length === 1) ? out[0] : out.join(join);
}



module.exports = {
    arrays: compareArrays,
    objects: compareObjects,
    normalize: {
        array: normalizeArray,
        object: normalizeObject
    },
    compare: {
        objects: compareObjects,
        arrays: compareArrays
    },
    typeMatch: typeMatch,
    inspect: inspect
};
