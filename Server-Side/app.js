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

var MongoClient = require('mongodb').MongoClient;
// const http = require('http');

// mongoose.connect('mongodb+srv://root:abcD1234@cluster0-wuil3.mongodb.net/test?retryWrites=true',
// 	{ useNewUrlParser: true });

mongoose.connect('mongodb://huong:Abc123@ds135844.mlab.com:35844/marketcoders',
	{ useMongoClient: true });

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

var allRoutes = require('./api/routes/apiRoutes');
allRoutes(app);

var port = 3000;
app.listen(process.env.PORT || port ,function(){
	console.log('Start at port ' + port);

});



