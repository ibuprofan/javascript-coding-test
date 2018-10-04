'use strict';

var template = require('./util').template,
    md5 = require('md5');


/**
 *
 * @param {Array}  master
 * @param {Array}  input
 * @param {Array}  details
 * @param {number} depth
 *
 * @returns {boolean} true only if matched
 */
function compareArrays(master, input, details, depth) {
    return false;
}


function compareObjects(master, input, details) {

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
    if (false === test(m, i)) {
        if (Array.isArray(details)) {
            details.push(
                template(
                    'Type mismatch [master] {master} != [input] {input}',  // todo master.prop
                    { input: (typeof i), expected: (typeof e) }
                )
            );
        }
        return false;
    } else {
        return true;
    }
}

module.exports = {
    arrays: compareArrays,
    objects: compareObjects,
    typeMatch: typeMatch,
    inspect: inspect
};
