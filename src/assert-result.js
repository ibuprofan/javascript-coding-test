'use strict';

function AssertResult() {
    this.set = function(key, value) {
        this[key] = value;
        return this;
    }
}

module.exports = function assertResult() {
    return new AssertResult();
};
