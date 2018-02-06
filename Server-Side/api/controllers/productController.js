var mongoose = require('mongoose');
var Product = require('../models/product');
var mongoosePaginate = require('mongoose-paginate');

exports.get_list = function(req, resp){
	console.log('i am getting list product.');
	var page = Number(req.query.page);
	var limit = Number(req.query.limit);
	var Brand = req.query.Brand;
	var ProductType = req.query.ProductType;
	var search = req.query.search;
	var query = {};
	if (page==0){
		page=1
	};
	if (Brand === undefined && search === undefined && ProductType !== undefined) {
		query = {
			status:1,
			ProductType:ProductType
		};
		if (ProductType =='kinh-the-thao') {
			query.ProductType = 'Kính Thể Thao'
		} else if (ProductType == 'kinh-mat-tre-em'){
			query.ProductType = 'Kính Mát Trẻ Em'
		} else if (ProductType == 'kinh-mat-nam'){
			query.ProductType = 'Kính Mát Nam'
		} else if (ProductType == 'kinh-mat-nu'){
			query.ProductType = 'Kính Mát Nữ'
		} else if (ProductType == 'kinh-ap-trong'){
			query.ProductType = 'Kính Áp Tròng'
		}else{
			query = {status:1};
		}
	} else if (ProductType === undefined && search === undefined && Brand !== undefined) {
		query = {
			status:1,
			Brand:Brand
		};
		if (Brand == 'Dolce-And-Gabbana')  {
			query.Brand = 'Dolce & Gabbana'
		}
	} else if (ProductType === undefined && Brand === undefined && search !== undefined) {
		query = {$text:{$search:search}}
	} else if(ProductType === undefined && Brand === undefined && search === undefined){
		query = {status:1};
	}else{
		query = {
			status:1,
			ProductType:ProductType,
			Brand:Brand
		};
		if (ProductType =='kinh-the-thao') {
			query.ProductType = 'Kính Thể Thao'
		} else if (ProductType == 'kinh-mat-tre-em'){
			query.ProductType = 'Kính Mát Trẻ Em'
		} else if (ProductType == 'kinh-mat-nam'){
			query.ProductType = 'Kính Mát Nam'
		} else if (ProductType == 'kinh-mat-nu'){
			query.ProductType = 'Kính Mát Nữ'
		} else if (ProductType == 'kinh-ap-trong'){
			query.ProductType = 'Kính Áp Tròng'
		}else{
			query = {status:1};
		}
	};
	console.log(query);
	Product.paginate(query, { page: page, limit: limit }, function(err, result) {
		if (err){
			resp.send(err)
		}else if (result.total == 0) {
			resp.status(404);
			resp.send('Not Found')
		}else{
			var responseData = {
				'listProduct': result.docs,
				'total': result.total
			};
			resp.json(responseData);
		}
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

