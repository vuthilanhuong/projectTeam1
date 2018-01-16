var memberController = require('../controllers/memberController');
var productController = require('../controllers/productController');
// var orderController = require('../controllers/orderController');

module.exports = function(app){
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