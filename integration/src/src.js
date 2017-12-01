var another = require('./another');
var http = require('http');

module.exports = {
    something: function() {
        http.request();
        return another.do();
    }
}
