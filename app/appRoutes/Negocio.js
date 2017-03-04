
// Node-Module

// [HandyCraft]
var pool = require('../utils/pool');

module.exports = {
	getNegocio: function(req, res) {

		pool.executeQuery({
			data: [req.user.codUsuario],
			query: "CALL getNegocio(?)",
			onConnectionError: function(err, errorID) {
				res.status(412).send({status: "-1", message: "Can't not connect to server", errID: errorID});
			},
			onQueryError: function(err, errorID) {
				res.status(412).send({status: "0", message: "Error on query trying to get Negocio", errID: errorID});
			},
			onSuccess: function(result) {
				res.status(200).send({status: "1", message: "OK", rows: result[0]});
			}
		});	
		
	}
}