module.exports = {
    _assertEquals: require('./src/assert-equals'),
    version: function () { return require('./package').version; },
    registry: require('./src/registry'),
    runAll: require('./src/run-all'),
    htmlReport: require('./src/html-reporter')
};
