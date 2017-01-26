var _module = require('./Module');

function injector(directory) {
  this.directory = directory;
}

injector.prototype  = {
    inject: function(key, value) {
        key = /[\/.]/g.test(key) ? this.directory + '/' + key : key;
        require.cache[require.resolve(key)] = new _module(value);
    },
    get: function(key) {
        key = /[\/.]/g.test(key) ? this.directory + '/' + key : key;
        return require.cache[require.resolve(key)];
    }
}

module.exports = function (directory) {
  return new injector(directory);
};
