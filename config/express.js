var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	//passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),
	middleware = require('./middleware');

module.exports = function() {
	var app = express();
	app.all('*', middleware.dominiosCruzados);

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	//app.use(passport.initialize()); //inicializando passort
	//app.use(passport.session());

	//importar las rutas de la app, paquete routes	
	require('../app/routes/clients.server.routes.js')(app);	
	require('../app/routes/trips.server.routes.js')(app);	
	require('../app/routes/drivers.server.routes.js')(app);
	app.use(express.static('./public'));

	return app;
};