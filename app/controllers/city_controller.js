module.exports = {
  index: function(params, callback) {
    this.app.set('title', 'Cities');
    
    var spec = {
      collection: {
      	collection: 'City', 
      	params: params
      }
    };

    this.app.fetch(spec, function(err, result) {
      callback(err, result);
    });

  },

  show: function(params, callback) {
		this.app.set('title', 'Cities');

		var spec = {
      collection: {
        collection: 'City',
        params: params
      }
    };
    
    this.app.fetch(spec, function (err, result) {
      callback(err, result);
    });

  }
}