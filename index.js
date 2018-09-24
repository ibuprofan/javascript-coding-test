module.exports = {
    assert: require('./src/assert'),
    version: function () { return require('./package').version; },
    registry: require('./src/registry'),
    runAll: require('./src/run-all'),
    htmlReport: require('./src/html-reporter')
};
