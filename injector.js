var _module = require('./Module');

function injector(directory) {
    this.directory = directory;
}

injector.prototype = {
    inject: function(key, value) {
        if (/[\/.]/g.test(key)) {
            key = require.resolve(this.directory + '/' + key);
        }
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
