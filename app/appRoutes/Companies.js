
var pool = require('../utils/pool');

module.exports = {
	getAllCompanies: function(req, res) {

		// req.user -> contains all decoded user data.
		// and we can use this:
		// if(req.user.canReadCompanies === 1) { ...
		pool.executeQuery({
			query: "CALL getAllCompanies()",
			onConnectionError: function(err, errorID) {
				res.status(412).send({status: "-1", message: "Can't not connect to server", errID: errorID});
			},
			onQueryError: function(err, errorID) {
				res.status(412).send({status: "0", message: "Error on query trying to save ftp sessions", errID: errorID});
			},
			onSuccess: function(result) {
				res.status(200).send({status: "1", message: "OK", rows: result[0]});
			}
		});
		/*
		} else {
				res.status(200).send({status: "-1", message: "YOU SHALL NO PASS"});
		}
		*/
	}
}