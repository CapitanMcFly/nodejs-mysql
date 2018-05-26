// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8090;
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var logopts = { logFilePath:'backend.log', timestampFormat:'DD-MM-YYYY HH:mm:ss.SSS' };
var log = require('simple-node-logger').createSimpleFileLogger(logopts);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// MySQL driver
var conn_pool = mysql.createPool({
	connectionLimit : 100,
	host     : 'localhost',
	user     : 'prueba',
	database : 'prueba',
	ssl      : { ca: fs.readFileSync('./ssl/server-ca.pem') }
});


// GET http://localhost:8090/api/cities
// Returns all cities
app.get('/api/cities', function(req, res) {
	// var user_id = req.param('id');
	// var token = req.param('token');
	// var geo = req.param('geo');
	// res.send(user_id + ' ' + token + ' ' + geo);

	// Creates a connection from the pool to execute the query
	conn_pool.getConnection(function(conn_err, connection) {
		if (conn_err) {
      connection.release();
      log.error("GET /api/cities -> Error getting connection pool: " + conn_err);
      throw conn_err;
    }
		connection.query('select * from cities', function (query_err, results, fields) {
			if(query_err){
				log.error("GET /api/cities from " + req.ip);
				//If there is error, we send the error in the error section with 500 status
				res.send(JSON.stringify({"status": 500, "error": query_err, "response": null}));
			} else {
				log.info("GET /api/cities from " + req.ip);
				//If there is no error, all is good and response is 200 OK.
				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			}
			// Finally the connection gets released
      connection.release();
			log.info("The connection was successfully released!");
		});
	});
});

// GET http://localhost:8090/api/cities/id
// Returns the city that matches the id
app.get('/api/cities/:id', function(req, res) {
	conn_pool.getConnection(function(conn_err, connection) {
		if (conn_err) {
      connection.release();
      log.error("GET /api/cities/" + req.params.id + " -> Error getting connection pool: " + conn_err);
      throw conn_err;
    }
		connection.query('select * from cities where ID = ?', req.params.id, function (query_err, results, fields) {
			if(query_err){
				log.error("GET /api/cities/" + req.params.id + " from " + req.ip);
				//If there is error, we send the error in the error section with 500 status
				res.send(JSON.stringify({"status": 500, "error": query_err, "response": null}));
			} else {
				log.info("GET /api/cities/" + req.params.id + " from " + req.ip);
				//If there is no error, all is good and response is 200 OK.
				res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			}
      connection.release();
			log.info("The connection was successfully released!");
		});
	});
});

// POST http://localhost:8090/api/cities
// Inserts a city with the parameters indicated in the request's body and returns its ID
app.post('/api/cities', function(req, res) {
	// var user_id = req.body.id;
	// var token = req.body.token;
	// var geo = req.body.geo;
	// res.send(user_id + ' ' + token + ' ' + geo);

	conn_pool.getConnection(function(conn_err, connection) {
		if (conn_err) {
      connection.release();
      log.error("POST /api/cities -> Error getting connection pool: " + conn_err);
      throw conn_err;
    }
		var sql = "INSERT INTO cities SET ?";
		connection.query(sql, req.body, function (query_err, results, fields) {
			if(query_err){
				log.error("POST /api/cities from " + req.ip);
				//If there is error, we send the error in the error section with 500 status
				res.send(JSON.stringify({"status": 500, "error": query_err, "response": null}));
			} else {
				log.info("POST /api/cities from " + req.ip);
				//If there is no error, all is good and response is 201 Created.
				res.send(JSON.stringify({"status": 201, "error": null, "response": results}));
			}
      connection.release();
			log.info("The connection was successfully released!");
		});
	});
});

// PUT http://localhost:8090/api/cities/id
// Updates the city that matches the id with the parameters indicated in the request's body
app.put('/api/cities/:id', function(req, res) {
	conn_pool.getConnection(function(conn_err, connection) {
		if (conn_err) {
      connection.release();
      log.error("PUT /api/cities/" + req.params.id + " -> Error getting connection pool: " + conn_err);
      throw conn_err;
    }
		connection.query('update cities set ? where ID = ?', [req.body, req.params.id], function (query_err, results, fields) {
			if(query_err){
				log.error("PUT /api/cities/" + req.params.id + " from " + req.ip);
				//If there is error, we send the error in the error section with 500 status
				res.send(JSON.stringify({"status": 500, "error": query_err, "response": null}));
			} else {
				log.info("PUT /api/cities/" + req.params.id + " from " + req.ip);
				//If there is no error, all is good and response is 200 OK.
				res.send(JSON.stringify({"status": 200, "error": null, "response": results.message}));
			}
			connection.release();
			log.info("The connection was successfully released!");
		});
	});
});

// DELETE http://localhost:8090/api/cities/id
// Deletes the city that matches the id
app.delete('/api/cities/:id', function(req, res) {
	conn_pool.getConnection(function(conn_err, connection) {
		if (conn_err) {
      connection.release();
      log.error("DELETE /api/cities/" + req.params.id + " -> Error getting connection pool: " + conn_err);
      throw conn_err;
    }
		connection.query('delete from cities where ID = ?', req.params.id, function (query_err, results, fields) {
			if(query_err){
				log.error("DELETE /api/cities/" + req.params.id + " from " + req.ip);
				//If there is error, we send the error in the error section with 500 status
				res.send(JSON.stringify({"status": 500, "error": query_err, "response": null}));
			} else {
				log.info("DELETE /api/cities/" + req.params.id + " from " + req.ip);
				//If there is no error, all is good and response is 204 No Content.
				res.send(JSON.stringify({"status": 204, "error": null, "response": "No Content"}));
			}
			connection.release();
			log.info("The connection was successfully released!");
		});
	});
});

// start the server
app.listen(port);
log.info('Server started! At http://localhost:' + port);
