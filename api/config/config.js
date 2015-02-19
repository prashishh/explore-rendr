'use strict';

exports.port = process.env.PORT || 3001;

exports.external_url = process.env.EXT_URL || 'localhost:3001';

exports.mongodb = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost/tennis-court',
  db: process.env.MONGODB_DB || 'tennis-court'
};

exports.cryptoKey = 'cRypT0gr@ph&';
