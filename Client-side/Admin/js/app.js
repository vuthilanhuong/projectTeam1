var app = angular.module('myApp',['ui.router', 'ui.bootstrap']);

app.config(appRouterConfig);
function appRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
			.state('Product', {
				url: '/product/page/:pageID',
				templateUrl: 'pages/product/listProduct.html',
				controller: 'productCtrl'
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
				url: '/order/:orderID',
				templateUrl: 'pages/order/order.html',
				controller: 'orderCtrl'
			}).state('OrderDetail', {
				url: '/orderDetail/:orderDetailID',
				templateUrl: 'pages/order/order_detail.html',
				controller: 'orderDetailCtrl'
			});
	
		$urlRouterProvider.otherwise('/product/page/1'); 
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

app.controller('productCtrl',function($scope,$stateParams,$http){
	$scope.ProductType = [
		{name:"Kính Thể Thao",type:"&ProductType=kinh-the-thao"},
		{name:"Kính Áp Tròng",type:"&ProductType=kinh-ap-trong"},
		{name:"Kính Mát Nữ",type:"&ProductType=kinh-mat-nu"},
		{name:"Kính Mát Nam",type:"&ProductType=kinh-mat-nam"},
		{name:"Kính Trẻ Em",type:"&ProductType=kinh-mat-tre-em"}];
	$scope.Brand = [
		{name:"Ray-Ban",type:"&Brand=Ray-Ban"},
		{name:"Oakley",type:"&Brand=Oakley"},
		{name:"Dolce & Gabbana",type:"&Brand=Dolce-And-Gabbana"},
		{name:"Burberry",type:"&Brand=Burberry"},
		{name:"Versace",type:"&Brand=Versace"}];
	var idxPage = $stateParams.pageID;
	$scope.loadProduct = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/products' + '?page=' + idxPage + '&limit=10'
		}).then(function mySuccess(response){
    		console.log(response);
    		$scope.restored_data = response.data;
            console.log('Get thanh cong');
    	}, function myError(response) {
    		console.log('loi dang ky');
    	});
	    $scope.currentPage = idxPage;
	};

	$scope.edit = function(item){
		localStorage.editProduct = JSON.stringify(item);
	};

	$scope.remove = function(item){ 
        $http({
			method: 'DELETE',
			url: 'http://localhost:3000/_api/v1/products/' + item._id
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Delete thanh cong');
            window.location.reload();
    	}, function myError(response) {
    		console.log('Delete fail');
    	});   
    };
});




