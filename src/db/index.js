var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Client = require('pg').Client;
var config = require('./config');
var client = new Client(config);
client.on('error', function (err) {
    console.error('something bad has happened!', err.stack);
});
client.on('notification', function (msg) {
    console.log(msg.channel);
    console.log(msg.payload);
});
client.on('notice', function (msg) { return console.warn('notice:', msg); });
client.connect();
module.exports = client;
