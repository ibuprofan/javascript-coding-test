'use strict';

var template = require('./util').template;


/**
 *
 * @param {Array} master
 * @param {Array} input
 * @param {Array} details
 *
 * @returns {boolean} true only if matched
 */
function compareArrays(master, input, details) {
    return false;
}


function compareObjects(master, input, details) {

}


function typeMatch(e, i, details) {
    if (false === test(m, i)) {
        details.push(
            template(
                'Type mismatch [master] {master} != [input] {input}',  // todo master.prop 
                { input: (typeof i), expected: (typeof e) }
            )
        );
        return false;
    } else {
        return true;
    }
}

module.exports = {
    arrays: compareArrays,
    objects: compareObjects,
    typeMatch: typeMatch
};
