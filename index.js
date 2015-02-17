var express = require('express')
  , rendr = require('rendr')
  , app = express()
  , multer = require('multer')
  , path = require('path')
  , cuid = require('cuid');

// request id for logger
var requestId = function requestId(req, res, next) {
  req.requestId = cuid.slug();
  next();
};

/**
 * Initialize Express middleware stack.
 */
// middleware
app.use(require('morgan')('dev'));  //  http request logger middleware for nodejs
app.use(require('compression')());  //  compression middleware for nodejs and connect 
app.use(require('serve-static')(path.join(__dirname, '/public'))); //  server static files
//app.use(require('body-parser')());  //  parse application/json and application/x-www-form-urlencoded
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(multer({ dest: './tmp/'}));
app.use(require('method-override')());  //  use HTTP verbs like PUT or DELETE
app.use(require('cookie-parser')());  //  parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(requestId); // request id for logger

/**
 * In this simple example, the DataAdapter config, which specifies host, port, etc. of the API
 * to hit, is written inline. In a real world example, you would probably move this out to a
 * config file. Also, if you want more control over the fetching of data, you can pass your own
 * `dataAdapter` object to the call to `rendr.createServer()`.
 */
var dataAdapterConfig = {
  'default': {
    host: 'api.github.com',
    protocol: 'https'
  },
  'travis-ci': {
    host: 'api.travis-ci.org',
    protocol: 'https'
  }
};

/**
 * Initialize our Rendr server.
 */
var server = rendr.createServer({
  dataAdapterConfig: dataAdapterConfig
});

/**
  * To mount Rendr, which owns its own Express instance for better encapsulation,
  * simply add `server` as a middleware onto your Express app.
  * This will add all of the routes defined in your `app/routes.js`.
  * If you want to mount your Rendr app onto a path, you can do something like:
  *
  *     app.use('/my_cool_app', server);
  */
app.use(server);

/**
 * Start the Express server.
 */
function start(){
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
    process.pid,
    port,
    app.get('env')
  );
}


/**
 * Only start server if this script is executed, not if it's require()'d.
 * This makes it easier to run integration tests on ephemeral ports.
 */
if (require.main === module) {
  start();
}

exports.app = app;
