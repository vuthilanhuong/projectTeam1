var app = angular.module('myApp',['ui.router', 'ui.bootstrap']);
function formatPrice(price){
	var result = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return result;
};
app.config(appRouterConfig);
function appRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
			.state('Product', {
				url: '/product',
				templateUrl: 'pages/product/listProduct.html',
				controller: 'productCtrl',
				params:{
					pageID:{
						value: 1,
						dymanic: true
					}
				}	
			})
			.state('AddProduct', {
				url: '/product/add',
				templateUrl: 'pages/product/addProduct.html',
				controller: 'addProductCtrl'
			})
			.state('EditProduct', {
				url: '/product/:productID/edit',
				templateUrl: 'pages/product/editProduct.html',
				controller: 'editProductCtrl'
			}).state('User', {
				url: '/user/page/:pageID',
				templateUrl: 'pages/user/listUser.html',
				controller: 'userCtrl'
			}).state('AddUser', {
				url: '/user/add',
				templateUrl: 'pages/user/addUser.html',
				controller: 'addUserCtrl'
			}).state('EditUser', {
				url: '/user/:userID/edit',
				templateUrl: 'pages/user/editUser.html',
				controller: 'editUserCtrl'
			}).state('Admin', {
				url: '/admin/page/:pageID',
				templateUrl: 'pages/admin/listAdmin.html',
				controller: 'adminCtrl'
			}).state('AddAdmin', {
				url: '/admin/add',
				templateUrl: 'pages/admin/addAdmin.html',
				controller: 'addAdminCtrl'
			}).state('EditAdmin', {
				url: '/admin/:userID/edit',
				templateUrl: 'pages/admin/editAdmin.html',
				controller: 'editAdminCtrl'
			}).state('Order', {
				url: '/order/page/:pageID',
				templateUrl: 'pages/order/order.html',
				controller: 'orderCtrl'
			}).state('EditOrder', {
				url: '/order/:orderID/edit',
				templateUrl: 'pages/order/editOrder.html',
				controller: 'editOrderCtrl'
			}).state('OrderDetail', {
				url: '/order/:orderID/page/:pageID',
				templateUrl: 'pages/order/order_detail.html',
				controller: 'orderDetailCtrl'
			})
			.state('EditOrderDetail', {
				url: '/orderDetail/:orderDetailID/edit',
				templateUrl: 'pages/order/editOrderDetail.html',
				controller: 'editOrderDetailCtrl'
			});
	
		$urlRouterProvider.otherwise('/product'); 
};

app.controller('indexCtrl',function($scope,$http){
	if(localStorage.admin === undefined){
		window.location.href = "pages/auth/login.html";
	};
	var secret = JSON.parse(localStorage.admin);
	console.log(secret.userID);
	console.log(secret.token);
	$scope.loadAdmin = function(){
		$http({
			method: 'GET',
			headers: {
				"Authorization": secret.token
			},
			url: 'http://localhost:3000/_api/v1/getAdmin/' + secret.userID
		}).then(function mySuccess(response){
    		if(response.data === null)
    		window.location.href = "pages/auth/login.html";
    		$scope.admin = response.data;
    	}, function myError(response) {
    		console.log('Error authenication');
    		window.location.href = "pages/auth/login.html";
    	});
	};

	$scope.logout = function () {
    	if(confirm("Bạn có chắc chắn muốn đăng xuất?")){
            localStorage.removeItem("admin");
            window.location.href = "pages/auth/login.html";		
        }
    };
});





