// * Routes protected by JWT.
var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    quoter  = require('../quoter'),

    fs      = require('fs'),
    iconv   = require('iconv-lite'),
    _       = require('underscore'),

    // Define api
    Negocio     = require("./appRoutes/Negocio"),
    Usuario     = require("./appRoutes/Usuario");
var app = module.exports = express.Router();

// Using the token's key
var jwtCheck = jwt({
    secret: config.secret
});

// All proected routes at: /protected/
// localhost[:8000]/api/protected/module/endPoint -> Will be protected
app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', function(req, res) {
	console.log(req.user);
	res.status(200).send(quoter.getRandomOne());
});
/*
app.get('/api/protected/getNotifications',			Notifications.getNotifications);
app.get('/api/protected/getEmailCouriers',			EmailCouriers.getEmailCouriers);
app.get('/api/protected/getAllCompanies',			Companies.getAllCompanies);
*/

app.get('/api/protected/getNegocio',                Negocio.getNegocio);


// Not protected, erase on production
app.get('/api/getAllUsuario',                       Usuario.getAllUsuario);
app.post('/api/createUsuario',                      Usuario.createUsuario);
app.get('/api/getData',                             Usuario.getData);
app.get('/api/getUltimosPedidos',                   Usuario.getUltimosPedidos);