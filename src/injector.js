var keyBuilder = require('./key-builder')
var mock = require('./mock')
var util = require('util')

var mockInjector = function(directory) {
  global.mock = util.deprecate(function(key) {
    return mock(key, directory)
  }, 'global `mock` function is deprecated, please use `const { mock } = require("mock-injector")`')

  return {
    mock: function(key) {
      return mock(key, directory)
    },
    subject: util.deprecate(function(key) {
      return this.clear(key)
    }, '`subject` function is deprecated, please use `const { clear } = require("mock-injector")`'),
    clear: function(key) {
      var identifier = keyBuilder.buildKey(key, directory)
      delete require.cache[identifier]
      return require(identifier)
    },
    inject: function(key, value) {
      var identifier = keyBuilder.buildKey(key, directory)
      require.cache[identifier] = {
        exports: value
      }
    }
  }
}

module.exports = mockInjector
