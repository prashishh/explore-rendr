var Base = require('./base');

module.exports = Base.extend({
  url: '/city/:name',
  idAttribute: 'name'
});

module.exports.id = 'City';
