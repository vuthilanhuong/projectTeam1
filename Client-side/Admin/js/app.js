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
    	if(confirm("Are you sure?")){
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
//                                 >>>>>>>>>>>>>>>>>>>Product<<<<<<<<<<<<<<<<<<<   

app.controller('editProductCtrl',function($scope,$http){

	$scope.loadFix = function(){
		$scope.detail_Product = JSON.parse(localStorage.editProduct);
		$scope.ProductType = ["Kính Thể Thao","Kính Áp Tròng","Kính Mát Nữ","Kính Mát Nam","Kính Mát Trẻ Em"];
		$scope.Brand = ["Ray-Ban","Oakley","Dolce & Gabbana","Burberry","Versace"];
		$scope.Availability = ["Có Sẵn Hàng","Hết Hàng"];
	};

	$scope.submitFix = function(data){
		$http({
			method: 'PUT',
			url: 'http://localhost:3000/_api/v1/products/' + data._id,
			data: data
		}).then(function mySuccess(response){
    		swal({
			  title: "Thành Công!",
			  text: " ",
			  icon: "success",
			  timer: 1000,
  			  buttons: false
			})
    	}, function myError(response) {
    		swal({
			  title: "Thất Bại!",
			  text: " ",
			  icon: "error",
			  timer: 1000,
  			  buttons: false
			})
    	});
	};

	$scope.uploading1 = function(){
		var fileUpload = document.getElementById("fileUpload1");
		var fd = new FormData();
			fd.append('file', fileUpload.files[0]);
			fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			$scope.detail_Product.Picture1 = response.data.secure_url;
    	}, function myError(response) {
    		console.log('That Bai')
	    })
	};

	$scope.uploading2 = function(){
		var fileUpload = document.getElementById("fileUpload2");
		var fd = new FormData();
			fd.append('file', fileUpload.files[0]);
			fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.detail_Product.Picture1 = response.data.secure_url;					
            console.log('thanh cong upload');
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    })
	};
});


app.controller('addProductCtrl',function($scope,$http){
	var smallImg = [];
	$scope.ProductType = ["Kính Thể Thao","Kính Áp Tròng","Kính Mát Nữ","Kính Mát Nam","Kính Mát Trẻ Em"];
	$scope.Brand = ["Ray-Ban","Oakley","Dolce & Gabbana","Burberry","Versace"];
	$scope.Availability = ["Có Sẵn Hàng","Hết Hàng"];

	//upload anh input
	$scope.uploading1 = function(){
		var fileUpload = document.getElementById("fileUpload1");
		var fd = new FormData();
			fd.append('file', fileUpload.files[0]);
			fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.Picture1 = response.data.secure_url;
			$scope.Picture1Show = true;
            console.log('thanh cong upload');

    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    })
	};

	$scope.uploading2 = function(){
		var fileUpload = document.getElementById("fileUpload2");
		var fd = new FormData();
			fd.append('file', fileUpload.files[0]);
			fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.Picture2 = response.data.secure_url;					
            console.log('thanh cong upload');
            $scope.Picture2Show = true;
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    })
	};
	//end upload

	//submit form
	$scope.save = function(){
		
		//post product
		var sendData = $scope.data;
		sendData.Picture1 = $scope.Picture1;
		sendData.Picture2 = $scope.Picture2;
		console.log($scope.data);
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/products',
			data: sendData
		}).then(function mySuccess(response){
    		swal({
			  title: "Thành Công!",
			  text: " ",
			  icon: "success",
			  timer: 1000,
  			  buttons: false
			})
    	}, function myError(response) {
    		swal({
			  title: "Thất Bại!",
			  text: "Sản phẩm đã tồn tại",
			  icon: "error",
			  timer: 1000,
  			  buttons: false
			})
    	});
		//end post product
	};
	//end submit

	//delete img upload
	$scope.deleteImg = function(img){
		var index=$scope.smallImg.indexOf(img);
        if(confirm("Bạn có chắc chắn xóa không?")){
            $scope.smallImg.splice(index,1);  
        }
	};
	//end delete img upload
});

//                                 >>>>>>>>>>>>>>>>>>>User<<<<<<<<<<<<<<<<<<<   

app.controller("userCtrl",function($scope,$stateParams,$http){
	var idxPage = $stateParams.pageID;

	$scope.loadUser = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/members/' + '?page=' + idxPage
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
		localStorage.editUser = JSON.stringify(item);
	};

	$scope.remove = function(item){ 
        $http({
			method: 'DELETE',
			url: 'http://localhost:3000/_api/v1/members/' + item._id
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Delete thanh cong');
            window.location.reload();
    	}, function myError(response) {
    		console.log('Delete that bai');
    	});   
    };
});

app.controller("addUserCtrl",function($scope,$http){
	$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	$scope.previewShow = true;

	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.img = response.data.secure_url;					
            console.log('thanh cong upload');
            $scope.previewShow = false;
            $scope.uploadErr = false
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    });
	};

	$scope.submitForm = function(){
		var data = $scope.sendData;
			data.gender = data.gender.value;
			data.avatarUrl = $scope.img;
			console.log(data);
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/members',
			data: data
		}).then(function mySuccess(response){
    		swal({
			  title: "Thành Công!",
			  text: " ",
			  icon: "success",
			  timer: 1000,
  			  buttons: false
			})
    	}, function myError(response) {
    		swal({
			  title: "Thất Bại!",
			  text: " ",
			  icon: "error",
			  timer: 1000,
  			  buttons: false
			})
    	}); 
	};

	$scope.resetForm = function(){
		$scope.previewShow = true
	};

	//Error messages
	$scope.userError = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/checkUser',
			data : $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			$scope.checkUser = true
    	}, function myError(response) {
    		$scope.checkUser = false
	    });
	};

	$scope.resetUser = function(){
		$scope.checkUser = false
	};

	$scope.confirmError = function(){
		if ($scope.confirmPassword == $scope.sendData.password) {
			$scope.checkConfirm = false;
		}else{
			$scope.checkConfirm = true;
		}			
	};

	$scope.resetConfirm = function(){
		$scope.checkConfirm = false
	};

	$scope.emailError = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/checkEmail',
			data: $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			$scope.checkEmail = true
    	}, function myError(response) {
    		$scope.checkEmail = false
	    });		
	};

	$scope.resetEmail = function(){
		$scope.checkEmail = false
	};

	$scope.birthDayError = function(){
		var today = new Date();
		var condition = today.setFullYear(today.getFullYear()-3);
		if ($scope.sendData.birthDay < condition) {
			$scope.checkBirthDay = false;
		}else{
			$scope.checkBirthDay = true;
		}	
	};
});

app.controller('editUserCtrl',function($scope,$http){

	$scope.loadFix = function(){
		$scope.detail_user = JSON.parse(localStorage.editUser);
		$scope.detail_user.birthDay = new Date($scope.detail_user.birthDay);
		$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	};

	$scope.submitFix = function(data){
		data.avatarUrl = $scope.img;
		$http({
			method: 'PUT',
			url: 'http://localhost:3000/_api/v1/members/' + data._id,
			data: data
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Update thanh cong');
    	}, function myError(response) {
    		console.log('Update loi');
    	});
	};

	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.detail_user.avatarUrl = response.data.secure_url;					
            console.log('thanh cong upload');
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    });
	};

});

//                               >>>>>>>>>>>>>>>>>>>ADMIN<<<<<<<<<<<<<<<<<<<   

app.controller("adminCtrl",function($scope,$stateParams,$http){
	var idxPage = $stateParams.pageID;

	$scope.loadAdmin = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/admins/' + '?page=' + idxPage
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
		localStorage.editAdmin = JSON.stringify(item);
	};

	$scope.remove = function(item){ 
        $http({
			method: 'DELETE',
			url: 'http://localhost:3000/_api/v1/admins/' + item._id
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Delete thanh cong');
            window.location.reload();
    	}, function myError(response) {
    		console.log('Delete that bai');
    	});   
    };
});

app.controller("addAdminCtrl",function($scope,$http){
	$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	$scope.previewShow = true;

	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.img = response.data.secure_url;					
            console.log('thanh cong upload');
            $scope.previewShow = false;
            $scope.uploadErr = false
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    });
	};

	$scope.submitForm = function(){
		var data = $scope.sendData;
			data.gender = data.gender.value;
			data.avatarUrl = $scope.img;
			console.log(data);
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/admins',
			data: data
		}).then(function mySuccess(response){
    		swal({
			  title: "Thành Công!",
			  text: " ",
			  icon: "success",
			  timer: 1000,
  			  buttons: false
			})
    	}, function myError(response) {
    		swal({
			  title: "Thất Bại!",
			  text: " ",
			  icon: "error",
			  timer: 1000,
  			  buttons: false
			})
    	}); 
	};

	$scope.resetForm = function(){
		$scope.previewShow = true
	};

	//Error messages
	$scope.userError = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/admin/checkUser',
			data : $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			$scope.checkUser = true
    	}, function myError(response) {
    		$scope.checkUser = false
	    });
	};

	$scope.resetUser = function(){
		$scope.checkUser = false
	};

	$scope.confirmError = function(){
		if ($scope.confirmPassword == $scope.sendData.password) {
			$scope.checkConfirm = false;
		}else{
			$scope.checkConfirm = true;
		}			
	};

	$scope.resetConfirm = function(){
		$scope.checkConfirm = false
	};

	$scope.emailError = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/admin/checkEmail',
			data: $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			$scope.checkEmail = true
    	}, function myError(response) {
    		$scope.checkEmail = false
	    });		
	};

	$scope.resetEmail = function(){
		$scope.checkEmail = false
	};

	$scope.birthDayError = function(){
		var today = new Date();
		var condition = today.setFullYear(today.getFullYear()-3)

		if ($scope.sendData.birthDay < condition) {
			$scope.checkBirthDay = false;
		}else{
			$scope.checkBirthDay = true;
		}	
	};
});

app.controller('editAdminCtrl',function($scope,$http){

	$scope.loadFix = function(){
		$scope.detail_admin = JSON.parse(localStorage.editAdmin);
		$scope.detail_admin.birthDay = new Date($scope.detail_admin.birthDay);
		$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	};

	$scope.submitFix = function(data){
		data.avatarUrl = $scope.img;
		$http({
			method: 'PUT',
			url: 'http://localhost:3000/_api/v1/admins/' + data._id,
			data: data
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Update thanh cong');
    	}, function myError(response) {
    		console.log('Update loi');
    	});
	};

	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			headers:{"Content-Type": undefined},
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false	
		}).then(function mySuccess(response){
			console.log(response);
			$scope.detail_user.avatarUrl = response.data.secure_url;					
            console.log('thanh cong upload');
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    });
	};

});

app.controller("orderCtrl",function($scope,$stateParams,$http){
	var idxPage = $stateParams.orderID;

	$scope.loadOrder = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/order/' + '?page=' + idxPage
		}).then(function mySuccess(response){
    		console.log(response);
    		$scope.restored_data = response.data;
            console.log('Get thanh cong');
    	}, function myError(response) {
    		console.log('Get loi');
    	});
	    $scope.currentPage = idxPage;
	};

	$scope.remove = function(item){ 
        $http({
			method: 'DELETE',
			url: 'http://localhost:3000/_api/v1/order/' + item._id
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Delete thanh cong');
            window.location.reload();
    	}, function myError(response) {
    		console.log('Delete that bai');
    	});   
    };
});

app.controller("orderDetailCtrl",function($scope,$stateParams,$http){
	var idxPage = $stateParams.orderDetailID;

	$scope.loadOrderDetail = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/orderDetail/' + '?page=' + idxPage
		}).then(function mySuccess(response){
    		console.log(response.data);
    		$scope.restored_data = response.data;
            console.log('Get thanh cong');
    	}, function myError(response) {
    		console.log('Get loi');
    	});
	    $scope.currentPage = idxPage;
	};

	$scope.remove = function(item){ 
        $http({
			method: 'DELETE',
			url: 'http://localhost:3000/_api/v1/orderDetail/' + item._id
		}).then(function mySuccess(response){
    		console.log(response);
            console.log('Delete thanh cong');
            window.location.reload();
    	}, function myError(response) {
    		console.log('Delete that bai');
    	});   
    };
});