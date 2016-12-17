
// Node-Module

// [HandyCraft]
var pool = require('../utils/pool');

module.exports = {
	getNotifications: function(req, res) {

		// req.user -> contains all decoded user data.
		// and we can use this:
		if(req.user.canSeeNotifications == "1") {
			pool.executeQuery({
				data: [req.body.date, req.body.anotherValue]
				query: "CALL getAllNotifications('0', ?, ?)",
				onConnectionError: function(err, errorID) {
					res.status(412).send({status: "-1", message: "Can't not connect to server", errID: errorID});
				},
				onQueryError: function(err, errorID) {
					console.log({status: "0", message: "Error on query trying to get Notifications", errID: errorID});
					res.status(412).send({status: "0", message: "Error on query trying to get Notifications", errID: errorID});
				},
				onSuccess: function(result) {
					res.status(200).send({status: "1", message: "OK", rows: result[0]});
				}
			});
		}
		/*
		} else {
				res.status(200).send({status: "-1", message: "YOU SHALL NO PASS"});
		}
		*/
	}
}