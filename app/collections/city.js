var City = require('../models/city')
  , Base = require('./base');

module.exports = Base.extend({
  model: City,
  url: function() {
    if (this.params.cityname != null) {
      return '/api/city/:cityname';
    } else {
      return '/api/city';
    }
  }
});

module.exports.id = 'City';
