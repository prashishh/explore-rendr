var Court = require('../models/court')
  , Base = require('./base');

module.exports = Base.extend({
  model: Court,
  url: function() {
    if (this.params.courtname != null) {
      return '/api/court/:courtname';
    } else {
      return '/api/court';
    }
  }
});

module.exports.id = 'Court';
