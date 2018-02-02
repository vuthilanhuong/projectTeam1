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