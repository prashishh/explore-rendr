var Base = require('./base');

module.exports = Base.extend({
  url: '/city/:cityname',
  idAttribute: 'cityname'
});

module.exports.id = 'City';
