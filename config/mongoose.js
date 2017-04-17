var config = require('./config'),
	mongoose = require('mongoose');


//se conecta a la base de datos y rquiere los modelos
module.exports = function() {
	//mongoose.Promise = require ('bluebird');
	var db = mongoose.connect(config.db);

	//importar los modelos 
	require('../app/models/client.server.model');
	require('../app/models/driver.server.model');
	require('../app/models/trip.server.model');
	
	return db;
};