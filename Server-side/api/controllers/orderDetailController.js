var OrderDetail = require('../models/order_detail');
var Order = require('../models/orders');
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
	OrderDetail.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, result) {
    	if (err)
      	  resp.send(err);
    	resp.json(result);
    	OrderDetail.find({orderId: result.orderId}, function(errors, orderArray){  
		    if (errors) {
		        resp.status(500).send(errors)
		    } else {
		    	var status = 0;
		    	var totalPrice = 0;
		    	for (var i = 0; i < orderArray.length; i++) {
		    		if (orderArray[i].status == 1 || orderArray[i].status == 2 || orderArray[i].status == 3) {
		    			status = 1;
		    		}else{
		    			status = 0;
		    		};
		    		totalPrice += Math.ceil(orderArray[i].unitPrice*orderArray[i].quantity*Number(status));
		    	};
		        Order.findById(result.orderId, function(err, task) {  
				    // Handle any possible database errors
				    if (err) {
				        resp.status(500).send(err);
				    } else {
				        task.totalPrice = totalPrice;
				        task.save(function(errOrder, taskOrder){
				            if (errOrder)
				                resp.send(errOrder);
				        });
				    }
				});
		    };
		});
  	});
};

exports.delete = function(req, resp){
	console.log('i am deleting member.');
	OrderDetail.findOneAndUpdate({_id: req.params.id}, {"status": 0}, {new: true}, function(err, result) {
    	if (err)
      	  resp.send(err);
    	Order.findById(result.orderId, function(err, task) {  
		    // Handle any possible database errors
		    if (err) {
		        resp.status(500).send(err);
		    } else {
		        task.totalPrice -= Math.ceil(result.unitPrice*result.quantity);
		        task.save(function(errOrder, taskOrder){
		            if (errOrder)
		                resp.send(errOrder);
		        });
		    }
		});
});
};