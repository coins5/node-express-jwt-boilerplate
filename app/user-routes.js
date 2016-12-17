// * API for logins.
var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mysql   = require("mysql");

var app = module.exports = express.Router();

// You need to replace this for the fields in your database
var omitUserFields = ['password', 'isEnabled' , 'anotherField'];
function createToken(user) {
	// You can change time expiresIn
    return jwt.sign(_.omit(user, omitUserFields), config.secret, { expiresIn: '24 hours' });
}

app.post('/sessions/create', function(req, res) {
    var usr = req.body.user;
    var pwd = req.body.password;

    pretendLogin({
    	onSuccess: function(userData) {
			if(userData.isEnabled) {
				var data = {
					token: createToken(userData),
					user: _.omit(userData, omitUserFields)
				}
				res.status(201).send( data );
			} else {
				res.status(203).send({"error": "User not enabled to login"});
			}
		}
    })
});

// You can replace this for login with your database or your own Auth Provider
function pretendLogin(options) {
	var userData = {
		name: "Jhon Doe",
		mail: "jd@mail.com",
		isEnabled: true;
	}
	options.onSuccess(userData);
}