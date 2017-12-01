module.exports = {
    buildKey: function(key, directory) {
        return require.resolve(/[\/.]/g.test(key) ? `${directory}/${key}` : key);
    }
}
