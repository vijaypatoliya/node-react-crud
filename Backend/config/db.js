/* eslint-disable no-console */

const mongoose = require('mongoose');
const appConstant = require('../constants/appConstant').config;

mongoose.connect(appConstant.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connection Successful');
});
db.on('error', () => {
  console.log('Error in mongodb connection');
});

module.exports = mongoose;
