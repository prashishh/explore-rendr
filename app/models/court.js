var Base = require('./base');

module.exports = Base.extend({
  url: '/court/:courtname',
  idAttribute: 'courtname'
});

module.exports.id = 'Court';
