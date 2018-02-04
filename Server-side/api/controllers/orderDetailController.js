var OrderDetail = require('../models/order_detail');
var mongoose = require('mongoose');

exports.get_list = function(req, resp){
	var page = Number(req.query.page);
	var orderID = req.query.orderID;
	var limit = 10;
	if (page==0){
		page=1
	};
  	OrderDetail.paginate({"orderId":orderID}, { page: page, limit: limit }, function(err, result) {
		if (err){
			resp.send(err)
		}else{
			var responseData = {
				'listOrderDetail': result.docs,
				'total': result.total
			};
			resp.send(responseData);
		}
	});
};

exports.update = function(req, resp){
	console.log('i am updating product.');
	OrderDetail.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};

exports.delete = function(req, resp){
	console.log('i am deleting member.');
	OrderDetail.findOneAndUpdate({_id: req.params.id}, {"status": 0}, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};