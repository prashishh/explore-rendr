'use strict';

var CityGET = require('./city/get');

module.exports = {
	
	getAllCourtByCity: CityGET.getAllCourtByCity,
	getCourtByCity: CityGET.getCourtByCity
};