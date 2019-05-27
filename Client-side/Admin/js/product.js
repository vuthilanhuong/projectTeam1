var API_URL ="https://dev20t1808m.herokuapp.com";
//1.Product controller chung
 app.controller('productCtrl',function($scope,$stateParams,$http,$state){
	$scope.ProductType = [
		{name:"Tất cả",type:""},
		{name:"Thiết Kế Logo",type:"&ProductType=thiet-ke-logo"},
		{name:"Danh Thiếp Văn Phòng Phẩm",type:"&ProductType=danh-thiep-van-phong-pham"},
		{name:"Thiết Kế Brochure",type:"&ProductType=thiet-ke-brochure"},
		{name:"Thiết Kế Web & Di Động",type:"&ProductType=thiet-ke-web-va-di-dong"},
		{name:"Lập Trình Web",type:"&ProductType=lap-trinh-web"},
		{name:"Ứng Dụng Di Động & Web",type:"&ProductType=ung-dung-di-dong-va-web"},
		{name:"Xây Dựng Trang Web & CMS",type:"&ProductType=xay-dung-trang-web-va-cms"}];
	$scope.Brand = [
		{name:"Tất cả",type:""},
		{name:"Thiết Kế Đồ Họa",type:"&Brand=thiet-ke-do-hoa"},
		{name:"Lập Trình Và Công Nghệ ",type:"&Brand=lap-trinh-va-cong-nghe"}];
	$scope.Availability = [
		{name:"Tất cả",type:""},
		{name:"Còn hàng",type:"&Availability=con-hang"},
		{name:"Hết hàng",type:"&Availability=het-hang"}];

	var idxPage = $stateParams.pageID;
	var query = "";
	$scope.changePage = function(){
		idxPage = $scope.currentPage;
		$scope.loadProduct();
	};

	$scope.changeChoose = function() {
		idxPage = 1;
		$scope.searchInput = "";
		query = $scope.productType.type;
		$scope.loadProduct();
	};

	$scope.searchForm = function(){
		if ($scope.searchInput != '') {
			query = '&search='+$scope.searchInput;
		};
		$scope.loadProduct();
	};

	$scope.loadProduct = function() {
	    $http({
			method: 'GET',
			url: API_URL + '/_api/products' + '?page=' + idxPage + '&limit=10' + query
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
		if(confirm("Bạn có chắc chắn muốn xóa không?")){
            $http({
				method: 'DELETE',
				url: API_URL + '/_api/products/' + item._id
			}).then(function mySuccess(res){
	    		console.log(res);
	            swal("Đã Xóa!", "", "success");
	            window.location.reload();
	    	}, function myError(res) {
	    		console.log('Delete fail');
	    	});	
        }
           
    };
});


//2.Sửa sản phẩm
app.controller('editProductCtrl',function($scope,$http){

	$scope.loadFix = function(){
		$scope.detail_Product = JSON.parse(localStorage.editProduct);
		$scope.ProductType = ["Thiết Kế Logo","Danh Thiếp Văn Phòng Phẩm","Thiết Kế Brochure","Thiết Kế Web & Di Động","Lập Trình Web","Ứng Dụng Di Động & Web","Xây Dựng Trang Web & CMS"];
		$scope.Brand = ["Thiết Kế Đồ Họa","Lập Trình Và Công Nghệ"];
		$scope.Availability = ["Có Sẵn Hàng","Hết Hàng"];
	};

	$scope.submitFix = function(data){
		$http({
			method: 'PUT',
			url: API_URL + '/_api/products/' + data._id,
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
              text: response.data,
              icon: "error",
              timer: 2500,
              buttons: false
            }).then(function () {
                window.location.href = "index.html#!/product/page/1";
            });
    	});
	};

	$scope.uploading1 = function(){
		var fileUpload = document.getElementById("fileUpload1");
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
			$scope.detail_Product.Picture1 = response.data.secure_url;
    	}, function myError(response) {
    		console.log('That Bai')
	    })
	};

	$scope.uploading2 = function(){
		var fileUpload = document.getElementById("fileUpload2");
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
			$scope.detail_Product.Picture1 = response.data.secure_url;					
            console.log('thanh cong upload');
    	}, function myError(response) {
    		console.log('loi upload');
    		console.log(response);
	    })
	};
});

//3. Thêm sản phẩm
app.controller('addProductCtrl',function($scope,$http){
	var smallImg = [];
	$scope.ProductType = ["Thiết Kế Logo","Danh Thiếp Văn Phòng Phẩm","Thiết Kế Brochure","Thiết Kế Web & Di Động","Lập Trình Web","Ứng Dụng Di Động & Web","Xây Dựng Trang Web & CMS"];
	$scope.Brand = ["Thiết Kế Đồ Họa","Lập Trình Và Công Nghệ"];
	$scope.Availability = ["Có Sẵn Hàng","Hết Hàng"];

	//upload anh input
	$scope.uploading1 = function(){
		var fileUpload = document.getElementById("fileUpload1");
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
			url: API_URL + '/_api/products',
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
            $scope.smallImg.splice(index,1);  //nối với...
        }
	};
	//end delete img upload
});