## Sample Tennis Court App using Rendr

** Deploy **
`grunt app` to deploy node server

`grunt api` to deploy the api server

Configurations can be change - *api/config/config.js*

```javascript
exports.port = process.env.PORT || 3001;
exports.external_url = process.env.EXT_URL || 'rendr-api.herokuapp.com';

exports.mongodb = {
uri: process.env.MONGODB_URI || 'mongodb://localhost/tennis-court',
db: process.env.MONGODB_DB || 'tennis-court'
};
```

*Default port is 3030 and 3001 for app and api servers respectively.*


** Live **
App: https://rendr-app.herokuapp.com/

Api: https://rendr-app.herokuapp.com/


