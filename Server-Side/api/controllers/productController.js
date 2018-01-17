var mongoose = require('mongoose');
var Product = require('../models/Product');
require('mongoose-pagination');

exports.get_list = function(req, resp){
	console.log('i am getting list product.');
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);
	Product.find({status:1})
	.paginate(page, limit, function(err, result, total) {
    	
    	console.log('chao huong');
    	console.log('total: ', total, 'result: ', result);
    	var responseData = {
    		'listProduct': result,
    		'totalPage': Math.ceil(total/limit)
    	};
    	resp.send(responseData);
  	});
};

exports.add = function(req, resp){
	console.log('i am adding product.');
	var product = new Product(req.body);
	Product.on('index', function (error) {
		if (error)
	    	resp.send(error);
	});
	product.save(function (err) {
	    if (err) {
	    console.log(err);
	    resp.status(500);
	    resp.send('Name product already exists');
	    } else {
	    resp.send('Save success');
	    }
	})
};

exports.get_detail = function(req, resp){
	console.log('i am getting a product.');
	Product.findById(req.params.id, function(err, result) {
    	if (err)
      	  resp.send(err);
    	resp.json(result);
  	});

};

exports.update = function(req, resp){
	console.log('i am updating product.');
	Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};

exports.delete = function(req, resp){
	console.log('i am deleting product.');
	Product.findOneAndUpdate({_id: req.params.id}, {"status": 0}, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};

