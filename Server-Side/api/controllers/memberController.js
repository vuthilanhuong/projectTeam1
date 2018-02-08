var mongoose = require('mongoose');
var Member = require('../models/member');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var mongoosePaginate = require('mongoose-paginate');

exports.get_list = function(req, resp){
	var page = Number(req.query.page);
	var limit = 10;
	var search = req.query.search;
	var query = {};
	if (page==0){
		page=1
	};
	if (search != "error") {
		query = {
			$text:{$search:search}
		};
	}else{
		query = {status:1};
	};
  	Member.paginate(query, { page: page, limit: limit }, function(err, result) {
		if (err){
			resp.send(err)
		}else{
			var responseData = {
				'listMember': result.docs,
				'total': result.total
			};
			resp.send(responseData);
		}
	});
};

exports.add = function(req, resp){
	console.log('i am adding member.');
	req.body.password = bcrypt.hashSync(req.body.password, 10);
	var member = new Member(req.body);
	Member.on('index', function (error) {
		if (error)
	    	resp.send(error);
	});
	member.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    resp.send('Save success');
	  }
	});
};

exports.get_detail = function(req, resp){
	console.log('i am getting a member.');
	Member.findById(req.params.id, function(err, result) {
    	if (err)
      	  resp.send(err);
    	resp.json(result);
  	});

};

exports.update = function(req, resp){
	console.log('i am updating member.');
	Member.findById(req.params.id, function(err, result) {
    	if (result.status == 0){
    		resp.status(500).send('Tài khoản này đã bị xóa');
    	}else{
    		Member.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(error, task) {
		    	if (error)
		      	  resp.send(error);
		    	resp.json(task);
		  	});
    	}
  	});
};

exports.delete = function(req, resp){
	console.log('i am deleting member.');
	Member.findOneAndUpdate({_id: req.params.id}, {"status": 0}, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

exports.getUser = function(req, res, next) {
	Member.findById(req.params.id, function(err, result) {
	    if (err)
	      res.status(400);
	    res.json(result);
	});
};

exports.login = function(req, resp){
	console.log('i am login.');
	if (req.body.userName == "" || req.body.password == "") {
		resp.status(500);
	};
	if(req.body.userName){
		if (req.body.password) {
			Member.find({"userName": req.body.userName,"status":1}, function(err, result) {
			    if (!result[0]){
			    	resp.status(500);
			    	resp.send('User name does not exist')
			    } else {
			    	if(bcrypt.compareSync(req.body.password, result[0].password)){
				    	resp.json({userID:result[0]._id,userName:result[0].userName,token: jwt.sign({ email: result[0].email, fullName: result[0].fullName, _id: result[0]._id }, 'UserAPI', { expiresIn: 1440 })});
				    }else{
				    	resp.status(500);
			    		resp.send('Wrong password')
				    }
			    }
   			})
		}else{
			resp.send('Not found');
		}
	}else{
		resp.send('Not found');
	}	
};

exports.checkUser = function(req, resp){
	console.log('i am login.');
	Member.find({"userName": req.body.userName}, function(err, result) {
	    if (!result[0])
	      resp.status(400);
	    resp.json(result);
    });
};

exports.checkEmail = function(req, resp){
	console.log('i am login.');
	Member.find({"email": req.body.email}, function(err, result) {
	    if (!result[0])
	      resp.status(400);
	    resp.json(result);
    });
};