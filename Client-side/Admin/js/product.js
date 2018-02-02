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