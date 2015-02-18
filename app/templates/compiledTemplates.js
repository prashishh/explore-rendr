module.exports = function(Handlebars) {

var templates = {};

Handlebars.registerPartial("_layout", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<!doctype html>\n<html lang=\"en\">\n\n  <head>\n    <meta charset='utf-8'/>\n    <title>"
    + escapeExpression(((stack1 = ((stack1 = depth0.appData),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " | Rendr Example App</title>\n    \n    <link href=\"/styles.css\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\" />\n  </head>\n\n  <body class=\"\">\n    <div class=\"navbar navbar-inverse navbar-fixed-top\">\n      <div class=\"container\">\n          <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"/\">TennCourts</a>\n          </div>\n          <ul class=\"nav navbar-nav\">\n            <li><a href=\"/\">Home</a></li>\n            <li><a href=\"/court\">Tennis Courts</a></li>\n            <li><a href=\"/city\">Cities</a></li>\n          </ul>\n          <div class=\"loading-indicator\">Loading&hellip;</div>\n        </div>\n\n    </div>\n\n    <section id=\"content\" class=\"container\">\n      ";
  if (stack2 = helpers.body) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.body; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </section>\n\n    <script src=\"/mergedAssets.js\"></script>\n    <script>\n    (function() {\n      var App = window.App = new (require('app/app'))(";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.json || depth0.json),stack1 ? stack1.call(depth0, depth0.appData, options) : helperMissing.call(depth0, "json", depth0.appData, options)))
    + ");\n      App.bootstrapData(";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.json || depth0.json),stack1 ? stack1.call(depth0, depth0.bootstrappedData, options) : helperMissing.call(depth0, "json", depth0.bootstrappedData, options)))
    + ");\n      App.start();\n    })();\n    </script>\n\n  </body>\n\n</html>\n";
  return buffer;
  }));

templates["city/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Users</h1>\n\n";
  });

templates["court/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Users</h1>\n\n";
  });

templates["home/index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h2>Wecome to TennCourts!</h2>\n<p>Get data of millions of Tennis Courts around the world. </p>\n<p>TennCourts collects data from various sources to provide you an API to consume its data for free. </p>\n\n<p>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.copyright || depth0.copyright),stack1 ? stack1.call(depth0, "2015", options) : helperMissing.call(depth0, "copyright", "2015", options)))
    + "</p>\n";
  return buffer;
  });

return templates;

};