'use strict';

var court = require('../../controllers/court');

module.exports = function(app) {

	app.get('/api/court', court.getAll);
	app.get('/api/court/:_id', court.getCourt);

};