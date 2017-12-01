var another = require('./another');
var http = require('http');
var async = require('async');
var express = require('express');

module.exports = {
    something: function() {

        var app = express();

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
