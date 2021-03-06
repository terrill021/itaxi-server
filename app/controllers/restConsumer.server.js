var http = require('http');
 
/**
 * Carga de los parámetros genéricos del servicio RESTful
 */
var host = 'localhost';
var port = '8080';
 
/**
 * Función encargada de reportar los cobros.
 */
var path = 'http://localhost:8080/iTaxiGenerateCharges-1.0/webservices/generateCharges';

exports.reportCash = function(jsonObject, callBack) {
 
    var body = JSON.stringify(jsonObject);

    var options = {
        host: host,
        port: port,
        path: path,
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Host : 'localhost'
        },
        encoding: null
    };
 
    // Se invoca el servicio RESTful con las opciones configuradas previamente con objeto JSON.
    invocarServicio(options, body, function (response, err) {
        callBack(err, response)
    });
};

/**
 * Función encargada de invocar los servicios RESTful y devolver
 * el objeto JSON correspondiente.
 */
function invocarServicio(options, jsonObject, next) {

    var req = http.request(options, function(res) { 
        var contentType = res.headers['content-type']; 
        /**
         * Variable para guardar los datos del servicio RESTfull.
         */
        var data = '';
 
        res.on('data', function (chunk) {
            // Cada vez que se recojan datos se agregan a la variable            
            data += chunk;
        }).on('end', function () {
            // Al terminar de recibir datos los procesamos
            var response = data;              
            // Nos aseguramos de que sea tipo JSON antes de convertirlo.
            if (contentType.indexOf('application/json') != -1) {
              response = JSON.parse(data);
            } 
            // Invocamos el next con los datos de respuesta
            next(response, false);
        }).on('error', function(err) {
            // Si hay errores los sacamos por consola
            console.error('Error al procesar el mensaje: ' + err)
        }).on('uncaughtException', function (err) {
            // Si hay alguna excepción no capturada la sacamos por consola
            console.error(err);
        });
    }).on('error', function (err) {
        // Si hay errores los sacamos por consola y le pasamos los errores a next.
        console.log('HTTP request failed: ' + err.stack);
        next(true, "Can´t get response from the OIS");
    });
 
    // Si la petición tiene datos estos se envían con la request
    if (jsonObject) {
        req.write(jsonObject);
    }
 
    req.end();
};