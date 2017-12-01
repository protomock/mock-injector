var keyBuilder = require("./key-builder");
var mock = require("./mock");

var mockInjector = function(directory) {
  this.directory = directory;

  global.mock = function(key) {
    return new mock(key, directory);
  };
};

mockInjector.prototype.mock = global.mock;

mockInjector.prototype.subject = function(key) {
  var identifier = keyBuilder.buildKey(key, this.directory);
  delete require.cache[identifier];
  return require(identifier);
};

mockInjector.prototype.inject = function(key, value) {
  var identifier = keyBuilder.buildKey(key, this.directory);
  require.cache[identifier] = {
    exports: value
  };
};

module.exports = function(directory) {
  return new mockInjector(directory);
};
