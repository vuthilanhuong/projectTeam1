var memberController = require('../controllers/memberController');
var adminController = require('../controllers/adminController');
var productController = require('../controllers/productController');
// var orderController = require('../controllers/orderController');

module.exports = function(app){
//member
	app.route('/_api/v1/members')
		.get(memberController.get_list)
		.post(memberController.add);
	app.route('/_api/v1/members/:id')
		.get(memberController.get_detail)
		.put(memberController.update)
		.delete(memberController.delete);
	app.route('/_api/v1/login')
		.post(memberController.login);
	app.route('/_api/v1/getUser/:id')
		.get(memberController.loginRequired, memberController.getUser);	
	app.route('/_api/v1/checkEmail')
		.post(memberController.checkEmail);
	app.route('/_api/v1/checkUser')
		.post(memberController.checkUser);
//admin
	app.route('/_api/v1/admins')
		.get(adminController.get_list)
		.post(adminController.add);
	app.route('/_api/v1/admins/:id')
		.get(adminController.get_detail)
		.put(adminController.update)
		.delete(adminController.delete);
	app.route('/_api/v1/admin/login')
		.post(adminController.login);
	app.route('/_api/v1/getAdmin/:id')
		.get(adminController.loginRequired, adminController.getAdmin);	
	app.route('/_api/v1/admin/checkEmail')
		.post(adminController.checkEmail);
	app.route('/_api/v1/admin/checkUser')
		.post(adminController.checkUser);
//product
	app.route('/_api/v1/products')
		.post(productController.add)
		.get(productController.get_list);
		
	app.route('/_api/v1/products/:id')
		.get(productController.get_detail)
		.put(productController.update)
		.delete(productController.delete);
	// app.route('/_api/v1/order')
	// 	.post(orderController.add)
	// 	.get(orderController.get_list);
	// app.route('/_api/v1/order/:id')
	// 	.get(orderController.get_detail)
	// 	.put(orderController.update)
	// 	.delete(orderController.delete);
};