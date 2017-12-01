module.exports = {
    buildKey: function(key, directory) {
        if (/[\/.]/g.test(key)) {
            key = require.resolve(directory + '/' + key);
        }
        return key;
    }
}
