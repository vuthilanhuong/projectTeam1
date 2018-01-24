const express = require('express')
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const fileupload = require('express-fileupload');
// var path = require('path');
// const fs = require('fs');
var mongoose = require('mongoose');

// var url = 'mongodb://localhost:27017/youtube_api';
// var MongoClient = require('mongodb').MongoClient;
// const http = require('http');

mongoose.connect('mongodb://sangbeo:123456@ds127536.mlab.com:27536/eyeonic', { useMongoClient: true });
mongoose.Promise = global.Promise;

// app.use(path());
app.use(fileupload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[0], 'UserAPI', function(err, decode) {
      if (err) {
      	req.user = undefined;
      	jwt.verify(req.headers.authorization.split(' ')[0], 'AdminAPI', function(err, decode) {
      		if (err)
      		   req.admin = undefined;
      		req.admin = decode;
      		next();
      	});
      }else{
      	req.user = decode;
      	next();
      } 
    });
  } else {
  	req.admin = undefined;
    req.user = undefined;
    next();
  }
});



var apiRoutes = require('./api/routes/apiRoutes');
apiRoutes(app);

app.listen('3000',function(){
	console.log('Start at port 3000');

});

// app.get('/', function(req, resp){
// 	fs.readFile('index.html', function (err, html) {      
//         resp.writeHeader(200, {"Content-Type": "text/html"});  
//         resp.write(html);  
//         resp.end();  
// 	});
// });

// app.get('/_api/v1/students', function(req, resp){
// 	MongoClient.connect(url, function(err, db) {
// 		db.collection('students').find().toArray(function(err, result){
// 			resp.json(result);
// 		});	
// 	});
// });

// app.post('/_api/v1/students',function(req, resp){
// 	var studentAdd = req.body;
// 	MongoClient.connect(url, function(err, db) {
// 		db.collection("students").insertOne(studentAdd, function(err, data) {
// 		console.log("1 document inserted");
// 		});
// 	});
// });

// app.post('/_api/v1/students/fix',function(req, resp){
// 	var studentAdd = req.body;
// 	MongoClient.connect(url, function(err, db) {
// 		db.collection("students").updateOne(studentAdd[0],{ $set:studentAdd[1]}, function(err, data) {
// 		console.log("1 document update");
// 		});
// 	});
// });

// app.delete('/_api/v1/students',function(req, resp){
// 	var studentDel = req.body;
// 	MongoClient.connect(url, function(err, db) {
// 		db.collection("students").deleteOne(studentDel, function(err, data) {
// 		console.log("1 document deleted");
// 		});
// 	});
// });
