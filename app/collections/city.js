var City = require('../models/city')
  , Base = require('./base');

module.exports = Base.extend({
  model: City,
  url: function() {
    if (this.params.name != null) {
      return '/api/city/:name';
    } else {
      return '/api/city';
    }
  }
});

module.exports.id = 'City';
