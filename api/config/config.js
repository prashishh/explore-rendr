'use strict';

exports.port = 3001;

exports.mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost/tennis-court',
  db: process.env.MONGODB_DB || 'tennis-court'
};