'use strict';

exports = module.exports = function(app, mongoose) {
	require('../schema/TennisCourt')(app, mongoose);
};