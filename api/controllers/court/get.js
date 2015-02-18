'use strict';

var mongoose = require('mongoose'),
		TennisCourt = mongoose.model('TennisCourt'),
		request = require('request'),
		accepts = require('accepts'),
		log4js = require('log4js');


log4js.configure('./config/log.json');
var logger = log4js.getLogger('app');

/**	Get all tennis courts
	*	 
	*/
module.exports.getCourts = function(req, res) {
	logger.info('[' + req.requestId + ']: ' + req.ip + '/' + req.hostname);
	logger.info('[' + req.requestId + ']: ' + 'call to retrieve tennis courts');

	res.set('Content-Type', 'application/json');
	TennisCourt.find({}, function(err, result) {
		if(err) {
			logger.error('[' + req.requestId + ']: ' + 'Error retrieving tennis courts ' + ' - ' + err);
			error.error = 'Error retrieving tennis courts list';
			res.status(400).send(error);
		} else {
			if(result.length > 0) {
				logger.info('[' + req.requestId + ']: ' + 'successfully retrieved tennis courts list ');
				logger.trace('[' + req.requestId + ']: ' + JSON.stringify(result));
				res.status(200).send(result);
			} else {
				logger.error('[' + req.requestId + ']: ' + 'Error retrieving tennis courts ' + ' - ' + err);
				res.status(200).send(null);
			}
		}
	});
};