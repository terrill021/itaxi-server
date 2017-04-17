//archivo controlador
var router = require("express").Router();
var clients = require('../../app/controllers/clients.server.controller');

//metodos REST
module.exports = function(app) {

//post
router.post('/clients', clients.create);

//get one. 
router.get('/clients/:clientId', clients.clientByID, clients.read);

//Registar credito a cliente
router.post('/clients/setbalance/:clientId', clients.clientByID, clients.setBalance);

//sesion
router.post('/clients/session', clients.session, clients.saveToken);

//client register push id
router.post('/client/reporttoken', clients.clientByID, clients.saveToken);
//
app.use('/', router);
};



