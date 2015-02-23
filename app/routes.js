module.exports = function(match) {
  match('',                   		'home#index');			// Homepage
  match('city',              			'city#index');			// List of Cities
  match('city/:cityname',       	'city#show');				// List of all tennis courts in a city
  match('court',			 						'court#index');			// List of tennis courts in any city
  match('court/:courtname',				'court#show');			// View tennis court page	
};
