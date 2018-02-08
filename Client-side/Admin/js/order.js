
app.controller("orderCtrl",function($scope,$stateParams,$http){
    var idxPage = $stateParams.pageID;
    $('input[name="daterange"]').daterangepicker({
            locale: {
              format: 'YYYY/MM/DD'
            },
            startDate: '2018/01/01',
            endDate: '2018/12/31'
        });
    $scope.dateChange = function(){
        $scope.loadOrder();
    };

    $scope.loadOrder = function() {
        var dateRange = document.getElementById('date_range').value;
        var datePicked = "";
        datePicked = '&startDate=' + dateRange.slice(0,10) + '&endDate=' + dateRange.slice(13,23);
        console.log(datePicked);
        $http({
            method: 'GET',
            url: 'http://localhost:3000/_api/v1/order/' + '?page=' + idxPage + datePicked
        }).then(function mySuccess(response){
            console.log(response);
            $scope.restored_data = response.data;
            for (var i = 0; i < $scope.restored_data.listOrder.length; i++) {
                if ($scope.restored_data.listOrder[i].status == 1) {
                    $scope.restored_data.listOrder[i].Availability = "Đã xong"
                }else if ($scope.restored_data.listOrder[i].status == 2) {
                    $scope.restored_data.listOrder[i].Availability = "Đang vận chuyển"
                }else if ($scope.restored_data.listOrder[i].status == 3) {
                    $scope.restored_data.listOrder[i].Availability = "Đang xử lý"
                }else if ($scope.restored_data.listOrder[i].status == 0) {
                    $scope.restored_data.listOrder[i].Availability = "Đã hủy"
                };
            };
            for (var i = 0; i < $scope.restored_data.listOrder.length; i++) {
                $scope.restored_data.listOrder[i].priceTotal = formatPrice($scope.restored_data.listOrder[i].totalPrice) + " VNĐ"
            };
            $scope.totalPrice = formatPrice($scope.restored_data.totalPrice);
            console.log('Get thanh cong');
        }, function myError(response) {
            console.log('Get loi');
        });
        $scope.currentPage = idxPage;
    };

    $scope.edit = function(item){
        localStorage.editOrder = JSON.stringify(item);
    };

	$scope.remove = function(item){ 
        if(confirm("Bạn có chắc chắn muốn hủy không?")){
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
        }
    };
});

app.controller('editOrderCtrl',function($scope,$http){

    $scope.loadFix = function(){
        $scope.detail_order = JSON.parse(localStorage.editOrder);
        $scope.status = [
            {name:"Đã xong",value:"1"},
            {name:"Đang vận chuyển",value:"2"},
            {name:"Đang xử lý",value:"3"},
            {name:"Đã hủy",value:"0"}];
        for (var i = 0; i < $scope.status.length; i++) {
            if($scope.status[i].value == $scope.detail_order.status){
                $scope.detail_order.status = $scope.status[i];
            };
        };
        $scope.detail_order.timeShip = new Date($scope.detail_order.timeShip);
        $scope.createAt = new Date($scope.detail_order.CreatAt);
    };

    $scope.submitFix = function(data){
        data.status = data.status.value;
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/_api/v1/order/' + data._id,
            data: data
        }).then(function mySuccess(response){
            console.log(response);
            swal({
              title: "Thành Công!",
              text: " ",
              icon: "success",
              timer: 1000,
              buttons: false
            }).then(function () {
                window.location.href = "index.html#!/order/page/1";
            });
        }, function myError(response) {
            console.log('Update loi');
        });
    };

});

app.controller("orderDetailCtrl",function($scope,$stateParams,$http){
	var idxPage = $stateParams.pageID;
    var orderID = $stateParams.orderID;

	$scope.loadOrderDetail = function() {
	    $http({
			method: 'GET',
			url: 'http://localhost:3000/_api/v1/orderDetail/' + '?page=' + idxPage + '&orderID='+orderID
		}).then(function mySuccess(response){
    		console.log(response.data);
    		$scope.restored_data = response.data;
            for (var i = 0; i < $scope.restored_data.listOrderDetail.length; i++) {
                if ($scope.restored_data.listOrderDetail[i].status == 1) {
                    $scope.restored_data.listOrderDetail[i].Availability = "Đã xong"
                }else if ($scope.restored_data.listOrderDetail[i].status == 2) {
                    $scope.restored_data.listOrderDetail[i].Availability = "Đang vận chuyển"
                }else if ($scope.restored_data.listOrderDetail[i].status == 3) {
                    $scope.restored_data.listOrderDetail[i].Availability = "Đang xử lý"
                }else if ($scope.restored_data.listOrderDetail[i].status == 0) {
                    $scope.restored_data.listOrderDetail[i].Availability = "Đã hủy"
                };
            };
            for (var i = 0; i < $scope.restored_data.listOrderDetail.length; i++) {
                $scope.restored_data.listOrderDetail[i].priceUnit = formatPrice($scope.restored_data.listOrderDetail[i].unitPrice) + " VNĐ"
            };
            console.log('Get thanh cong');
    	}, function myError(response) {
    		console.log('Get loi');
    	});
	    $scope.currentPage = idxPage;
	};
});