// * API for logins.
var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    // mysql   = require("mysql");
    pool	= require("./utils/pool");

var app = module.exports = express.Router();

// You need to replace this for the fields in your database
var omitUserFields = ['password', 'isEnabled'];

function createToken(user) {
	// You can change time expiresIn
    return jwt.sign(_.omit(user, omitUserFields), config.secret, { expiresIn: '1 year' });
}

app.post('/sessions/create', function(req, res) {
    var usr = req.body.userID;
    var pwd = req.body.password;
    pretendLogin({
    	userID: usr,
    	password: pwd,
    	onSuccess: function(userData) {		
			var data = {
				token: createToken(userData),
				user: _.omit(userData, omitUserFields)
			}
			res.status(201).send( data );
		},
		onError: function(error) {
			res.status(401).send(error);
		},
		onDisabled: function(error) {
			res.status(401).send(error);
		}
    })
});

// You can replace this for login with your database or your own Auth Provider
function pretendLogin(options) {
	/*
	var userData = {
		userID: "admin",
		password: "admin",
		mail: "admin@admin.com",
		name: "Jhon Doe",
		mail: "jd@mail.com",
		isEnabled: true
	}
	if(options.userID === userData.userID && options.password === userData.password) {
		if(userData.isEnabled) {
			options.onSuccess(userData);	
		} else {
			options.onDisabled({error: "User is disabled"});
		}
			
	} else {
		options.onError({error: "User or password doesn't match"});
	}
	*/

	pool.executeQuery({
		data: [options.userID, options.password],
		query: "CALL login(?, ?)",
		onConnectionError: function(err, errorID) {
			res.status(412).send({status: "-1", message: "Can't not connect to mysql server", errID: errorID});
		},
		onQueryError: function(err, errorID) {
			res.status(412).send({status: "0", message: "Error on query trying to login", errID: errorID});
		},
		onSuccess: function(result) {
			var userData = result[0][0];
			console.dir(userData);
			if(userData) {
				if(userData.isEnabled === '1') {
					options.onSuccess(userData);
				} else {
					options.onDisabled({error: "User is disabled"});
				}	
			} else {
				options.onError({error: "User or password doesn't match"});
			}
		}
	});


}