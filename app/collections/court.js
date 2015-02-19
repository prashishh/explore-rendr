var Court = require('../models/court')
  , Base = require('./base');

module.exports = Base.extend({
  model: Court,
  url: function() {
    if (this.params.name != null) {
      return '/api/court/:name';
    } else {
      return '/api/court';
    }
  }
});

module.exports.id = 'Court';
