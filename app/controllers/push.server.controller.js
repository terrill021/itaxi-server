var gcm = require('node-gcm');
var senderId ='AIzaSyDsUzCqQOXpuJJ0To3VyUj2IZWm71jlxN8';

///
exports.sendPush = function(message, registrationId, callback){
	console.log('Send push')
	var message = new gcm.Message({data: {tittle: "Itaxi", message: message}});
	var regTokens = [registrationId];
	var sender = new gcm.Sender(senderId);

if(registrationId){
	
	sender.send(message, { registrationTokens: regTokens }, function (err, response) {
		if (err){
			console.error(err);	

		} else 	{
			console.log(response);
			}
					callback();		

	});
}
	

}