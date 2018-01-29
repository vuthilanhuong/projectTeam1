var memberController = require('../controllers/memberController');
var adminController = require('../controllers/adminController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var orderController = require('../controllers/orderController');
var orderDetailController = require('../controllers/orderDetailController');

module.exports = function(app){
//member
	app.route('/_api/v1/members')
		.get(memberController.get_list)
		.post(memberController.add);
	app.route('/_api/v1/members/:id')
		.get(memberController.get_detail)
		.put(memberController.update)
		.delete(memberController.delete);
	app.route('/_api/v1/members/login')
		.post(memberController.login);
	app.route('/_api/v1/getUser/:id')
		.get(memberController.loginRequired, memberController.getUser);	
	app.route('/_api/v1/members/checkEmail')
		.post(memberController.checkEmail);
	app.route('/_api/v1/members/checkUser')
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
	app.route('/_api/v1/cart')
		.post(cartController.saveCart);
	app.route('/_api/v1/order')
		.get(orderController.get_list);
	app.route('/_api/v1/order/:id')	
		.delete(orderController.delete);
	app.route('/_api/v1/orderDetail')
		.get(orderDetailController.get_list);
	app.route('/_api/v1/orderDetail/:id')
		.delete(orderDetailController.delete);
};