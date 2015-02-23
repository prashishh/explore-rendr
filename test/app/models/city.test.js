var City = require('../../../app/models/city');

describe('City', function() {

  it('should use name as the model id', function() {
    var city = new City({name: 'cityname'});
    city.id.should.equal('cityname');
  });

});
