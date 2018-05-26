// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8090;
var bodyParser = require('body-parser');
var mysql= require('mysql');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// MySQL driver
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'prueba',
	database : 'prueba'
});
connection.connect(function(err) {
  if (err){
    console.log("ERROR: MySQL connection KO...");
    throw err;
  }
  console.log("MySQL connection OK!");
});

// routes will go here
// GET http://localhost:8090/api/cities
app.get('/api/cities', function(req, res) {
  // var user_id = req.param('id');
  // var token = req.param('token');
  // var geo = req.param('geo');
  // res.send(user_id + ' ' + token + ' ' + geo);

  connection.query('select * from cities', function (error, results, fields) {
  	if(error){
      //If there is error, we send the error in the error section with 500 status
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	} else {
      //If there is no error, all is good and response is 200OK.
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	}
  });
});

// POST http://localhost:8090/api/cities
app.post('/api/cities', function(req, res) {
  // var user_id = req.body.id;
  // var token = req.body.token;
  // var geo = req.body.geo;
  // res.send(user_id + ' ' + token + ' ' + geo);

  var sql = "INSERT INTO cities SET ?";
  connection.query(sql, req.body, function (error, results, fields) {
  	if(error){
      //If there is error, we send the error in the error section with 500 status
      res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
  	} else {
      //If there is no error, all is good and response is 200OK.
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  	}
  });
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
