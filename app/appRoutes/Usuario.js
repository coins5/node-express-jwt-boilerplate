
// Node-Module

// [HandyCraft]
var pool = require('../utils/pool');

module.exports = {
	getAllUsuario: function(req, res) {
		pool.executeQuery({
			query: "SELECT * FROM Usuario",
			onConnectionError: function(err, errorID) {
				res.status(412).send({status: "-1", message: "Can't not connect to server", errID: errorID});
			},
			onQueryError: function(err, errorID) {
				res.status(412).send({status: "0", message: "Error on query trying to get Negocio", errID: errorID});
			},
			onSuccess: function(result) {
				res.status(200).send({status: "1", message: "OK", rows: result});
			}
		});	
	},
	createUsuario: function(req, res) {

		pool.executeQuery({
			data: [req.body.nombre.trim(), req.body.password.trim(), req.body.emailUsuario.trim(), req.body.telefonoUsuario.trim(), 
				req.body.codTipoDocumento.trim(), req.body.numeroDocumentoUsuario, req.body.ubigeo.trim()],
			query: "CALL createUsuario(?, ?, ?, ?, ?, ?, ?)",
			onConnectionError: function(err, errorID) {
				res.status(412).send({status: "-1", message: "Can't not connect to server", errID: errorID, error:err});
			},
			onQueryError: function(err, errorID) {
				res.status(412).send({status: "0", message: "Error on query trying to create a user", errID: errorID, error: err});
			},
			onSuccess: function(result) {
				res.status(200).send({
					status: "1", 
					message: "OK", 
					rows_select_usuario_negocio: result[0] ,
					input_data: req.body
				});
			}
		})
	},
	getData: function(req, res) {
		var sql = "select * from ProductoDistribuidora;";
		sql = sql + "select *, 'http://placehold.it/128x128' as urlImage from ProductoMaestro;";
		sql = sql + "select * from ListaPrecio;";
		sql = sql + "select * from Distribuidora;";
		sql = sql + "select * from vendedorreparto;";
		pool.executeQuery({
			query: sql,
			onConnectionError: function(err, errorID) {
				res.status(412).send({status: "-1", message: "Can't not connect to server", errID: errorID, error:err});
			},
			onQueryError: function(err, errorID) {
				res.status(412).send({status: "0", message: "Error on query trying to get data", errID: errorID, error: err});
			},
			onSuccess: function(result) {
				res.status(200).send({
					status: "1", 
					message: "OK", 
					ProductoDistribuidora: 	result[0],
					ProductoMaestro: 		result[1],
					ListaPrecio: 			result[2],
					Distribuidora: 			result[3],
					VendedorReparto: 		result[4]
				});
			}
		});
	},
	getUltimosPedidos: function(req, res) {
		
		var _ultimosPedidoDetalle = [];
		_ultimosPedidoDetalle.push({codPedido: 1, precio: 1, cantidad: 2, codProducto: "7509546045085-7509546045085"});
		_ultimosPedidoDetalle.push({codPedido: 1, precio: 2, cantidad: 1, codProducto: "7702010631672-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 1, precio: 3, cantidad: 4, codProducto: "7753887000054-7753887000054"});
		_ultimosPedidoDetalle.push({codPedido: 2, precio: 6, cantidad: 2, codProducto: "7753887000047-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 3, precio: 9, cantidad: 7, codProducto: "7753887000030-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 3, precio: 1, cantidad: 6, codProducto: "6934394430614-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 4, precio: 6, cantidad: 9, codProducto: "6934394430607-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 4, precio: 6, cantidad: 6, codProducto: "6934394430591-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 4, precio: 9, cantidad: 8, codProducto: "7861059961437-6951544980157"});
		_ultimosPedidoDetalle.push({codPedido: 4, precio: 2, cantidad: 4, codProducto: "7861059961536-6951544980218"});
		_ultimosPedidoDetalle.push({codPedido: 5, precio: 7, cantidad: 5, codProducto: "7861059961246-6951501007613"});
		_ultimosPedidoDetalle.push({codPedido: 6, precio: 4, cantidad: 9, codProducto: "6951544980171-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 7, precio: 3, cantidad: 1, codProducto: "7707197670148-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 8, precio: 2, cantidad: 2, codProducto: "7453022400427-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 9, precio: 8, cantidad: 7, codProducto: "6934394410296-6944633610073"});
		_ultimosPedidoDetalle.push({codPedido: 9, precio: 7, cantidad: 3, codProducto: "130273555-0000000000000"});
		_ultimosPedidoDetalle.push({codPedido: 10, precio: 1, cantidad: 2, codProducto: "6934394408224-0000000000000"});

		res.status(200).send({
			status: "1", 
			message: "OK", 
			rows: _ultimosPedidoDetalle
		});
	}
}