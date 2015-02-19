'use strict';

var city = require('../../controllers/city');

module.exports = function(app) {

	app.get('/api/city', city.getAllCourtByCity);
	app.get('/api/city/:name', city.getCourtByCity);

};