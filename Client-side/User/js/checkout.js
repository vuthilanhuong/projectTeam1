$(document).ready(function() {
    checkout();
});

function checkout(){	
	if (localStorage.members !== undefined) {
		var member = JSON.parse(localStorage.members);
	}else{
		var contentCheckout = '';
			contentCheckout +=  '<div class="text-center">';
			contentCheckout +=  '<h2>Lỗi!</h2>';
			contentCheckout +=  '<br>';
			contentCheckout +=  '<h4>Bạn phải <a href="login.html">Đăng Nhập</a> để sử dụng chức năng này</h4>';
			contentCheckout +=  '</div>';
		$('#indexCheckout').html(contentCheckout);
	};
	if (localStorage.cart === undefined || JSON.parse(localStorage.cart).length == 0) {
		var content = '';
			content +=  '<div class="text-center">';
			content +=  '<h2>Lỗi!</h2>';
			content +=  '<br>';
			content +=  '<h4>Chưa có sản phẩm</h4>';
			content +=  '</div>';
    	$('#indexCheckout').html(content);
	}else{
		console.log(member.userID);
		var cart_details = JSON.parse(localStorage.cart);
		$('#btnCheckout').click(function(){
			var orderCheckout = {
				"shipName": $('#shipName').val(),
				"phone": $('#phone').val(),
				"address": $('#address').val(),
				"timeShip": $('#timeShip').val(),
				"note": $('#noteCheckout').val(),
				"products": JSON.stringify(cart_details),
				"customerID": member.userID,
				"customerName": member.userName
			};
			$.ajax({
				url: 'http://localhost:3000/_api/v1/cart',
				type: 'POST',
				data: orderCheckout,	
				success: function(response){
					swal({
					  title: "Thành Công!",
					  icon: "success",
					  text: " ",
					  timer: 2000,
		  			  buttons: false
					}).then(function(){
						localStorage.removeItem("cart");
						window.location.href = 'index.html';
					});
				},
				error: function(response, message){
					swal({
					  title: "Thất Bại!",
					  icon: "error",
					  text: " ",
					  timer: 2000,
		  			  buttons: false
					});
				}
			});
		});
	};
};