
//archivo controlador
var router = require('express').Router();

var trips = require('../../app/controllers/trips.server.controller');
var clients = require('../../app/controllers/clients.server.controller');
var drivers = require('../../app/controllers/drivers.server.controller');

//metodos REST
module.exports = function(app) {

//Solicitar un viaje
router.post('/trips/:clientId', clients.clientByID, drivers.searhVacantDriver,
							    trips.createTrip, drivers.lockDriver, trips.confirmTrip);

//Consultar viajes de un cliente
router.get('/trips/:clientId', trips.list, trips.read);

//cobrar un viaje
router.post('/trips/cash/:tripId', trips.tripById, clients.clientByID,
								   drivers.driverByID, trips.calculateTripValue,
								   trips.cashTrip, drivers.unlockDriver,
								   trips.reportCashedTrip);

//consultar viaje por cobrar de un cliente
router.get('/trips/uncashed/:driverId', drivers.driverByID, trips.getUncashedTrip);
//
app.use('/', router);
};




