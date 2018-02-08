var Order = require('../models/orders');
var OrderDetail = require('../models/order_detail');
var mongoose = require('mongoose');

exports.get_list = function(req, resp){
	var page = Number(req.query.page);
	var startDate = String(req.query.startDate);
	var endDate = String(req.query.endDate);
	var totalPrice = 0;
	console.log(startDate);
	console.log(endDate);
	var limit = 10;
	if (page==0){
		page=1
	};
	Order.find({status:{$in:[1,2,3]},CreatAt: {$gte:startDate,$lt: endDate}}, function(error, task) {
    	if (error)
      	  resp.send(error);
    	for (var i = 0; i < task.length; i++) {
    		totalPrice += task[i].totalPrice;
    	};
    	Order.paginate({CreatAt: {$gte:startDate,$lt: endDate}}, { page: page, limit: limit }, function(err, result) {
			if (err){
				resp.send(err)
			}else{
				var responseData = {
					'listOrder': result.docs,
					'total': result.total,
					'totalPrice': totalPrice
				};
				resp.send(responseData);
			}
		});
  	});
};

exports.update = function(req, resp){
	console.log('i am updating product.');
	Order.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
    	resp.json(task);
  	});
};


exports.delete = function(req, resp){
	console.log('i am deleting order.');
	Order.findOneAndUpdate({_id: req.params.id}, {"status": 0}, {new: true}, function(err, task) {
    	if (err)
      	  resp.send(err);
      	console.log(task);
    	OrderDetail.update({orderId: task._id}, {"status": 0}, function(error, result) {
	    	if (error)
	      	  resp.send(error);
	      	console.log(result);
	    	resp.json(result);
		});
  	});
};