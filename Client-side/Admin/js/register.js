var API_URL ="https://dev20t1808m.herokuapp.com";
var app = angular.module("myApp",[]);

app.controller("registerCtrl",function($scope,$http){
	$scope.gender = [{name:"Nam",value:"1"},{name:"Nữ",value:"2"}];
	$scope.previewShow = true;

	//1.upload image
	$scope.uploading = function(){
		var fileUpload = document.getElementById("fileUpload");
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','ka4udhi4');
		$http({
			method: 'POST',
			url: 'https://api.cloudinary.com/v1_1/huongaptech/image/upload',
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


	$scope.login = function(){
		$http({
			method: 'POST',
			url: API_URL+ '/_api/admin/login',
			data : $scope.sendData
		}).then(function mySuccess(response){
			console.log(response);
			localStorage.admin = JSON.stringify(response.data);
    	}, function myError(response) {
    		console.log('error')
	    });
	};

	//2.post to database(include imgURL)
	$scope.submitForm = function(){
		var data = $scope.sendData;
			data.gender = data.gender.value;
			data.avatarUrl = $scope.img;
			console.log(data);
		$http({
			method: 'POST',
			url: API_URL+ '/_api/admins',
			data: data
		}).then(function mySuccess(response){
    		console.log(response);
    		$scope.login(); //Neu dang ky thanh cong thi tu dong login
    		swal({
			  title: "Đăng Ký Thành Công!",
			  icon: "success",
			  text: " ",
			  timer: 2000,
  			  buttons: false
			}).then(function () {
				window.location.href = "../../index.html";
			});
    	}, function myError(response) {
    		console.log('Dang nhap that bai');
    	}); 
	};

	$scope.resetForm = function(){
		$scope.previewShow = true
	};

	//Error messages
	$scope.userError = function(){
		$http({
			method: 'POST',
			url: API_URL+ '/_api/admin/checkUser',
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
			url: API_URL+ '/_api/admin/checkEmail',
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
})