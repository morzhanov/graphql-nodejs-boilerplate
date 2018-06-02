const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const {Client} = require('pg');
const config = require('./config');

const client = new Client(config);

client.on('error', (err: Error) => {
  console.error('something bad has happened!', err.stack);
});

client.on('notification', (msg: any) => {
  console.log(msg.channel);
  console.log(msg.payload);
});

client.on('notice', (msg: string) => console.warn('notice:', msg));

client.connect();

module.exports = client;
