'use strict';

var assertResult = require('./assert-result');

function isEqual(expect, given) {

}

/**
 * Asserts "expected" versus "actual",
 * 'failing' the assertion (via Error) if a difference is found.
 *
 * @param {String} message The comparison message passed by the user
 * @param {*} expected The expected item
 * @param {*} actual The actual item
 * @return AssertResult
 */
module.exports = function assertEquals(message, expected, actual) {
    return assertResult()
             .set('message', message)
             .set(
               'result',
               isEqual(expected, actual)
             );
}
