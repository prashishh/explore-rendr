var Base = require('./base');

module.exports = Base.extend({
  url: '/court/:name',
  idAttribute: 'name'
});

module.exports.id = 'Court';
