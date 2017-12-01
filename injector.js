var _module = require('./Module');
var keyBuilder = require('./key-builder');

function injector(directory) {
    this.directory = directory;
}

injector.prototype = {
    get: function(key) {
        key = keyBuilder.buildKey(key, this.directory);
        return require.cache[key];
    },
    inject: function(key, value) {
        key = keyBuilder.buildKey(key, this.directory);
        require.cache[key] = new _module(value);
    },
    get: function(key) {
        if (/[\/.]/g.test(key)) {
            key = require.resolve(this.directory + '/' + key);
        }
        return require.cache[key];
    }
}

module.exports = function(directory) {
    return new injector(directory);
};
