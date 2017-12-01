var keyBuilder = require("./key-builder");
var moduleStubber = require("./module-stubber");

function Mock(key, directory) {
  key = keyBuilder.buildKey(key, directory);
  moduleStubber.stubExports(key);
  return require(key);
}

module.exports = Mock;
