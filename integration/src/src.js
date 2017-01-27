var another = require('./another');
var http = require('http');
var async = require('async');


module.exports = {
    something: function() {
        async.parallel([
            function(callback) {
                http.request();
                callback();
            },
            function(callback) {
                var results = another.do();
                callback(results);
            }
        ], function(err) {
            if (err) {
                throw err;
            }
        });
    }
}
