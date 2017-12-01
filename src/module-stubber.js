var sinon = require("sinon");

module.exports = {
  stubExports: function(key) {
    // HACK: only require if not in cache
    require.cache[key] || require(key);

    var exports = require.cache[key].exports;
    if (typeof exports === "function") {
      require.cache[key].exports = sinon.stub();
    } else {
      require.cache[key] = {
        exports: {}
      };
      for (var property in exports) {
        if (exports.hasOwnProperty(property)) {
          require.cache[key].exports[property] = sinon.stub();
        }
      }
    }
  }
};
