// * Rutas anonimas, no requiren autenticacion. Se puede usar para testear  
var express = require('express'),
    quoter  = require('../quoter');

var app = module.exports = express.Router();

app.get('/api/random-quote', function(req, res) {
	res.status(200).send(quoter.getRandomOne());
});
