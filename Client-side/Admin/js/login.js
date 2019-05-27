var app = angular.module("myApp",[]);
var API_URL ="https://dev20t1808m.herokuapp.com";

app.controller("loginCtrl",function($scope,$http){
	$scope.submitForm = function(){
		$http({
			method: 'POST',
			url: API_URL + '/_api/admin/login',
			data: $scope.sendData
		}).then(function mySuccess(response){
    		console.log(response);
			localStorage.admin = JSON.stringify(response.data);
			console.log(localStorage.admin);
    		swal({
			  title: "Đăng Nhập Thành Công!",
			  text: " ",
			  icon: "success",
			  timer: 2000,
  			  buttons: false
			}).then(function () {
				window.location.href = "../../index.html";
			});
    	}, function myError(response) {
    		swal({
			  title: "Đăng Nhập Thất Bại!",
			  text: "Tài khoản hoặc mật khẩu sai",
			  icon: "error",
			  buttons: "Retry"
			})
    	}); 
	}
})