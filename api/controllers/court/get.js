'use strict';

var mongoose = require('mongoose'),
		TennisCourt = mongoose.model('TennisCourt'),
		log4js = require('log4js');


//log4js.configure('../config/log.json');
var logger = log4js.getLogger('app');

/**	Get all tennis courts
	*	 
	*/
module.exports.getAll = function(req, res) {
	logger.info('[' + req.requestId + ']: ' + req.ip + '/' + req.hostname);
	logger.info('[' + req.requestId + ']: ' + 'call to retrieve tennis courts');

	var t = new TennisCourt({
		name: '123',
		city: '123'
	});

	t.save(function(err) {
		if(err)
			console.log('error');
		else
			console.log('done');
	});
	
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
				logger.error('[' + req.requestId + ']: ' + 'No Tennis Court Details ' + ' - ' + err);
				res.status(200).send(null);
			}
		}
	});
};