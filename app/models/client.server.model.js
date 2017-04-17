var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientsSchema = new Schema({
	name : String,
	user: {type : String, trim : true, unique : true},
	password : String,
	phone : String,
	email : String,
	balance : Number, 
	creationDate : Date, 
	pushToken : {type : String, default: null}
});

mongoose.model('Clients', ClientsSchema);
