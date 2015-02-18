'use strict';

module.exports = function(app) {
	require('./api/city')(app);
	require('./api/court')(app);
};