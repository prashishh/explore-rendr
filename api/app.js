'use strict';
// Module Dependencies
var express = require('express'),
		http = require('http'),
		path = require('path'),
		connect = require('connect'),
		log4js = require('log4js'),
		helmet = require('helmet'),
		flash = require('connect-flash'),
	  mongoose = require('mongoose'),
    session = require('express-session'),
	  mongoStore = require('connect-mongo')(session),
		config = require('./config/config'),
		multer = require('multer'),
		cuid = require('cuid');

// express
var app = express();

// logger
var logger = log4js.getLogger('app');
log4js.configure();
app.logger = logger;

// keeping reference to config
app.config = config;

// web server
app.server = http.createServer(app);

// request id for logger
var requestId = function requestId(req, res, next) {
	req.requestId = cuid.slug();
	next();
};

mongoose.connect(config.mongodb.uri, {server:{auto_reconnect:true}});

mongoose.connection.on('error', function(err) {
  logger.error('Mongoose Connection Error: ' + err);
  mongoose.disconnect();
});

mongoose.connection.on('open', function(err) {
  logger.info('MongoDB Connection Opened.');
});

mongoose.connection.on('close', function(err) {
  logger.info('MongoDB Connection Closed.');
});

mongoose.connection.on('disconnected', function () {
  logger.error("Disconnected from MongoDB - " + config.mongodb.uri);
  mongoose.connect(config.mongodb.uri, {server:{ auto_reconnect:false }});
});

mongoose.connection.on('connected', function(err) {
  logger.info("Successfully connected to MongoDB - " + config.mongodb.uri);
});


// data model
require('./models/index')(app, mongoose);

// config
app.disable('x-powered-by'); // remove powered by express
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(require('morgan')('dev')); // http request logger middleware for nodejs
app.use(require('compression')()); // compression middleware for nodejs and connect
app.use(require('serve-static')(path.join(__dirname, '../../public'))); // server static files
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
	extended: true
}));

app.use(multer({ dest: './tmp/'}));
app.use(require('method-override')()); // use HTTP verbs like PUT or DELETE
app.use(require('cookie-parser')()); // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(requestId); // request id for logger

app.use(session({
  secret: config.cryptoKey,
  store: new mongoStore({ url: config.mongodb.uri, auto_reconnect: true }),
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: null }
}));

// setup
require('./routes/index')(app);

// start listening
app.server.listen(app.config.port, function() {
	logger.info('Node started at ' + app.config.port);
});

// if node process ends, close the mongoose connection
process.on('SIGINT', function() {
  app.db.close(function () {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

