var Order = require('../models/orders');
var OrderDetail = require('../models/order_detail');
var mongoose = require('mongoose');

exports.get_list = function(req, resp){
	var page = Number(req.query.page);
	var limit = 10;
	if (page==0){
		page=1
	};
  	Order.paginate({status:3}, { page: page, limit: limit }, function(err, result) {
		if (err){
			resp.send(err)
		}else{
			var responseData = {
				'listOrder': result.docs,
				'total': result.total
			};
			resp.send(responseData);
		}
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