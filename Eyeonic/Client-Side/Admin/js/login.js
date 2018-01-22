var app = angular.module("myApp",[]);

app.controller("loginCtrl",function($scope,$http){
	$scope.submitForm = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:3000/_api/v1/admin/login',
			data: $scope.sendData
		}).then(function mySuccess(response){
    		console.log(response);
			localStorage.admin = JSON.stringify(response.data);
    		swal({
			  title: "Login Success!",
			  text: " ",
			  icon: "success",
			  timer: 2000,
  			  buttons: false
			}).then(function () {
				window.location.href = "../../index.html";
			});
    	}, function myError(response) {
    		swal({
			  title: "Login Error!",
			  text: "User name or password incorrect",
			  icon: "error",
			  buttons: "Retry"
			})
    	}); 
	}
})