var keyBuilder = require('./key-builder');
var mock = require('./mock');

var MockInjector = function(directory) {
    this.directory = directory;

    var injector = function(key) {
        return mock(key, directory)
    }

    injector.subject = function(key) {
        var identifier = keyBuilder.buildKey(key, this.directory);
        delete require.cache[identifier];
        return require(identifier);
    }.bind(this);

    injector.inject = function(key, value) {
        var identifier = keyBuilder.buildKey(key, this.directory);
        require.cache[identifier] = {
            exports: value
        };
    }.bind(this);

    return injector;
}

module.exports = function(directory) {
    return new MockInjector(directory)
}
