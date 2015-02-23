
var City = require('../../../app/collections/city');

describe('City', function() {

  it('should have a default url if params.name is not specified', function() {
    var city = new City();
    city.url().should.equal('/api/city');
  });

  it('should have a unique url if params.name is specified', function() {
    var city = new City();
    city.params.name = 'someusername';
    city.url().should.equal('/api/city/:name');
  });

});
