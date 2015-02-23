module.exports = {
  index: function(params, callback) {
    this.app.set('title', 'Tennis Courts');
    
    var spec = {
      collection: {
      	collection: 'Court',
      	params: params
      }
    };

    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });

  },

  show: function(params, callback) {
		this.app.set('title', 'Tennis Courts');

		var spec = {
      collection: {
        collection: 'Court',
        params: params
      }
    };
    
    this.app.fetch(spec, function (err, result) {
      callback(err, result);
    });

  }
}