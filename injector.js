var _module = require('./Module');
var keyBuilder = require('./key-builder');

function injector(directory) {
    this.subjectIdentifier = '';
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
    clearSubjectFromCache: function() {
        delete require.cache[this.subjectIdentifier];
    },
    subject: function(key) {
        var identifier = keyBuilder.buildKey(key, this.directory);
        this.subjectIdentifier = identifier;
        this.clearSubjectFromCache();
        return require(identifier);
    }
}

module.exports = function(directory) {
    return new injector(directory);
};
