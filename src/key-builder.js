module.exports = {
  buildKey: function(key, directory) {
    var moduleToResolve = /[\/.]/g.test(key) ? directory + "/" + key : key;
    return require.resolve(moduleToResolve);
  }
};
