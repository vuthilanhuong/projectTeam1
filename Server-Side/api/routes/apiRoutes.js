var memberController = require('../controllers/memberController');
var adminController = require('../controllers/adminController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var orderController = require('../controllers/orderController');
var orderDetailController = require('../controllers/orderDetailController');

module.exports = function(app){
//member
	app.route('/_api/members')
		.get(memberController.get_list)
		.post(memberController.add);
	app.route('/_api/members/:id')
		.get(memberController.get_detail)
		.put(memberController.update)
		.delete(memberController.delete);
	app.route('/_api/members/login')
		.post(memberController.login);
	app.route('/_api/getUser/:id')
		.get(memberController.loginRequired, memberController.getUser);	
	app.route('/_api/members/checkEmail')
		.post(memberController.checkEmail);
	app.route('/_api/members/checkUser')
		.post(memberController.checkUser);
//admin
	app.route('/_api/admins')
		.get(adminController.get_list)
		.post(adminController.add);
	app.route('/_api/admins/:id')
		.get(adminController.get_detail)
		.put(adminController.update)
		.delete(adminController.delete);
	app.route('/_api/admin/login')
		.post(adminController.login);
	app.route('/_api/getAdmin/:id')
		.get(adminController.loginRequired, adminController.getAdmin);	
	app.route('/_api/admin/checkEmail')
		.post(adminController.checkEmail);
	app.route('/_api/admin/checkUser')
		.post(adminController.checkUser);
//product
	app.route('/_api/products')
		.post(productController.add)
		.get(productController.get_list);
	app.route('/_api/products/:id')
		.get(productController.get_detail)
		.put(productController.update)
		.delete(productController.delete);
	app.route('/_api/cart')
		.post(cartController.saveCart);
	app.route('/_api/order')
		.get(orderController.get_list);
	app.route('/_api/order/:id')
		.put(orderController.update)
		.delete(orderController.delete);
	app.route('/_api/orderDetail')
		.get(orderDetailController.get_list);
	app.route('/_api/orderDetail/:id')
		.put(orderDetailController.update)
		.delete(orderDetailController.delete);
};