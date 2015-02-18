module.exports = function(match) {
  match('',                   'home#index');	// Homepage
  match('city',              	'city#index');	// List of Cities
  match('court',			 				'city#show');		// List of tennis courts
  match('court/:courtid',			'court#index');	// View tennis court page	
  match('court/:city',       	'court#show');	// List of all tennis courts in a city
};
