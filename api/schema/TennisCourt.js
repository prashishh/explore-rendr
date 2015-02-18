'use strict';

// Module Dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

exports = module.exports = function(app, mongoose) {
	var tennisCourtSchema = new mongoose.Schema({
			name: { type: String, required: true },
			city: { type: String, required: true }
	});

	mongoose.model('TennisCourt', tennisCourtSchema);
};