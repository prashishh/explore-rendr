'use strict';

// Module Dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

exports = module.exports = function(app, mongoose) {
	var tennisCourtSchema = new mongoose.Schema({
			name: { type: String, required: true },
			rank: { type: Number },
			city: { type: String, required: true },
			country: { type: String, required: true },
			tournament: { type: String },
			capacity: { type: String },
			tour: { type: String }
	});

	mongoose.model('TennisCourt', tennisCourtSchema);
};