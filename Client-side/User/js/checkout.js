//hàm chính
$(document).ready(function(){
	$( "#btnCheckout" ).prop( "disabled", true);
	var checkshipName = false;
	var checkaddress = false;
	var checkphone = false;
	var checktimeShip = false;

	submit();
});

//hàm validate ship name
function validateShipName(){
	var shipName = document.getElementById("shipName");
	var shipNameError = document.getElementById("shipName-error");
	if(shipName.value.length == 0) {
		shipNameError.style.color = "red";
		shipNameError.innerHTML = "Vui lòng nhập tên";
	}else if(shipName.value.length < 7){
		shipNameError.style.color = " red";
		shipNameError.innerHTML = "Tên phải dài hơn 7 kí tự";
	}else{
		shipNameError.style.color = "green";
		shipNameError.innerHTML = "Hợp lệ";
		var checkshipName = true;
		console.log(checkshipName);
	};
	checkout();
};

//validate phone
function validatePhone(){
	var phone = document.getElementById("phone");
	var phoneError = document.getElementById("phone-error");
	if(phone.value.length == 0){
		phoneError.style.color = "red";
		phoneError.innerHTML = "Vui lòng nhập số điện thoại";
	}else if(phone.value.length < 10){
		phoneError.style.color = " red";
		phoneError.innerHTML = "Số điện thoại không đúng";
	}else if(phone.value.length > 11){
		phoneError.style.color = " red";
		phoneError.innerHTML = "Số điện thoại không đúng";
	}else{
		phoneError.style.color = "green";
		phoneError.innerHTML = "Hợp lệ";
		checkphone = true;
		console.log(checkphone);
	};
	checkout();
};	

//validateAddress
function validateAddress(){
	var address = document.getElementById("address");
	var addressError = document.getElementById("address-error");
	if(address.value.length == 0) {
		addressError.style.color = "red";
		addressError.innerHTML = "Vui lòng nhập địa chỉ";
	}else if(address.value.length < 7){
		addressError.style.color = " red";
		addressError.innerHTML = "Địa chỉ phải dài hơn 7 kí tự";
	}else if(address.value.length > 50) {
		addressError.style.color = "red";
		addressError.innerHTML = "Địa chỉ nhập không được quá 50 kí tự";		
	}else {
		checkaddress = true;
		addressError.style.color = "green";
		addressError.innerHTML = "Hợp lệ";
		console.log(checkaddress);
	};
	checkout();
};

function validateTimeShip() {
	var timeShip = document.getElementById('timeShip');
	var timeShipError = document.getElementById('timeShip-error');
	var today = new Date();
	today.setFullYear(today.getFullYear()-0);
	timeShip = new Date(timeShip.value);
	if (timeShip < today) {
		timeShipError.style.color = "red";
		timeShipError.innerHTML = "Ngày giao hàng không thể là ngày quá khứ.";
		checkout();
	
	}else{
		checktimeShip = true;
		timeShipError.style.color = "green";
		// timeShipError.style.fontsize = "10px";
		timeShipError.innerHTML = "Hợp lệ";
		console.log(checktimeShip);
		checkout();
	} 
	
};


function checkout(){
 	if (checktimeShip === true && checkaddress === true && checkphone === true && checktimeShip === true) {
 		$('#btnCheckout').prop('disabled', false);
 	}else{
 		$('#btnCheckout').prop('disabled', true);
 	};
 };

//hàm submit lưu thông tin đơn hàng vào database{
function submit(){
	if (localStorage.members !== undefined) {
		var member = JSON.parse(localStorage.members);
	}else{
		var contentCheckout = '';
			contentCheckout +=  '<div class="text-center">';
			contentCheckout +=  '<h2>Thông báo!</h2>';
			contentCheckout +=  '<br>';
			contentCheckout +=  '<h4>Bạn phải <a href="login.html">Đăng Nhập</a> để sử dụng chức năng này</h4>';
			contentCheckout +=  '</div>';
		$('#indexCheckout').html(contentCheckout);
	};

	if (localStorage.cart === undefined) {
		var content = '';
			content +=  '<div class="text-center">';
			content +=  '<h4>Hiện chưa có sản phẩm trong đơn hàng!</h4>';
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
						window.location.href = 'index.html'
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