var another = require('./another');
var http = require('http');
var async = require('async');


module.exports = {
    something: function() {
        async.waterfall([
            function(cb) {
               another.do(cb);
            }
        ], function(err, results) {
            if (err) {
                throw err;
            }
        });
    }
}
