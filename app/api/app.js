'use strict';

// Module Dependencies
var express = require('express'),
  http = require('http'),
  path = require('path'),
  connect = require('connect'),
  log4js = require('log4js'),
  helmet = require('helmet'),
  flash = require('connect-flash'),
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

// config
app.disable('x-powered-by'); // remove powered by express
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(require('morgan')('dev'));  //  http request logger middleware for nodejs
app.use(require('compression')());  //  compression middleware for nodejs and connect 
app.use(require('serve-static')(path.join(__dirname, '../../public'))); //  server static files
//app.use(require('body-parser')());  //  parse application/json and application/x-www-form-urlencoded
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(multer({ dest: './tmp/'}));
app.use(require('method-override')());  //  use HTTP verbs like PUT or DELETE
app.use(require('cookie-parser')());  //  parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(requestId); // request id for logger

helmet.defaults(app);   //  middleware for express/connect that implements security headers

// setup
// require('./routes/index')(app);

// start listening
app.server.listen(app.config.port, function() {
  logger.info('Node started at ' + app.config.port);
});
