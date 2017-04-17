var Drivers = require('mongoose').model('Drivers');

//Crear un nuevo conductor
exports.create = function(req, res, next) {		
	console.log(req.body);

	var drivers = new Drivers(req.body);
	
		drivers.save(function(err, driver) {
			if (err) {
				res.json({error : true, message: error})
			}	
			else {				
				req.driver = driver;
				next();
			}
		}); 
};

//listar todos los conductores
exports.list = function(req, res, next) {
	Drivers.find({}, function(err, drivers) {
		if (err) {
		return next(err);
		}
		else {
		res.json(drivers);
		}
	});
};
//fin listar todos los conductores

//Buscar un conductor disponible
exports.searhVacantDriver = function(req, res, next){	
	//
	console.log("searhVacantDriver");
	//Busco un conductor disponible
	Drivers.findOne({vacant : true}, function(err, driver){
		if(err){
			return next(err);
		}else{
			// Si no hay conductores disponibles
			if(driver == null){				
				res.json(
					{
						error: true,
					 	message:"Not drivers avaliable"
					}
				);
			}
			else{
				//Guardo conductor en el request
				req.driver = driver;
				//LLamo al siguiente midleware
				next();
			}			
		}
	}); 
}

//Mostrar conductor
exports.read = function(req, res) {
	console.log("read"); 
	req.res = {};
	req.res.driver = req.driver;
	req.res.error = false;
	req.res.message = "operation ended correctly";
	
	res.json(req.res);
};

//Bloquear un conductor que esta ocupado
exports.lockDriver = function(req, res, next) {
	console.log("lockDriver");
	//marco al conductor como ocupado
	req.driver.vacant = false;
	//Actualizo la información del conductor
	req.driver.save(function(err){
		if(err){
			console.log("Error, conductor no bloqueado");
			res.json({error : true, message:"There was an mistake blocking the driver"});
		}
		else{
			console.log("conductor bloqueado");
			next();
		}
	});
};

// Desbloquear a un conductor
exports.unlockDriver = function(req, res, next) {
	console.log("unlockDriver");
	//marco al conductor como desocupado
	req.driver.vacant = true;
	//Actualizo la información del conductor
	req.driver.save(function(err){
		if(err){
			console.log("Error, conductor no desbloqueado");
			next(err);
		}
		else{
			console.log("conductor desbloqueado");
			//LLama al siguiente midleware
			next();
		}
	});
};
 

//buscar un conductor, y guardarlo en una variable
exports.driverByID = function(req, res, next) {
	console.log("driverByID");

	Drivers.findOne({
		_id: req.params.driverId || req.trip.driver
		},
		function(err, driver) {
			if (err) {
				return next(err);
			}
			else {
				if(driver == null) {
					res.json({error : true, message:"The client do not exist"});
				}
				req.driver = driver;
				next();
			}
	});
};

//iniciar sesion conductor
exports.session = function(req, res, next) {
	console.log('Sesion driver')
	Drivers.findOne({user : req.body.user, password : req.body.password}, function(err, driver){
		if (err) {res.json({error : true, message : "Internal error"})};

	if(!driver){res.json({error : true, message : "Driver not found"})};
			req.driver = driver;
			next();
		})
};

exports.saveToken = function (req, res, next){
console.log('Save token');
if(req.body.pushToken){
	req.driver.pushToken = req.body.pushToken;
}
	req.driver.save(function(err, driver){
		if (err) {res.json({error : true, message : "There was an mistake saving the push token", description: err })};
		res.json({error :false, message: "Push id saved correctly", user: driver});
	})
}