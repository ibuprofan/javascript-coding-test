'use strict';

var equals = require('./assert').assert.equals;

/**
 * Asserts "expected" versus "actual",
 * 'failing' the assertion (via Error) if a difference is found.
 *
 * @param {String} message The comparison message passed by the user
 * @param {*} expected The expected item
 * @param {*} actual The actual item
 * @param {function} Assertion function
 * @return AssertResult
 */
module.exports = function assert(message, expected, actual, assertion) {
    return assertResult()
        .set('message', message)
        .set('expected', expected)
        .set('actual', actual)
        .set('assertion', assertion)
        .execute();

};
