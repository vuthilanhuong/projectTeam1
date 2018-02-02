 var checkName = false;
var checkEmail = false;
var checkUser = false;
var checkPass = false;
var checkRePass = false;
var checkBirthday = false;
var checkAva = false;

document.getElementById('fullName').onkeyup = function () {
	checkSubmit();
	var fullName =  document.getElementById('fullName');
	var nameError = document.getElementById('nameError');
	if (fullName.value.length == 0) {
		nameError.style.color = "red";
		nameError.innerHTML = "*  Tên đầy đủ không được bỏ trống";
		checkName = false;
	}
	else if (fullName.value.length < 4 ) {
		nameError.style.color = "red";
		nameError.innerHTML = "*  Tên đầy đủ phải dài hơn 4 ký tự";
		checkName = false;
	}
	else {
		nameError.innerHTML = ""
		checkName = true;
	};	
};


document.getElementById('username').onkeyup = function () {
	checkSubmit();
	var name = document.getElementById('username');
	var userError = document.getElementById('userError');

	if (name.value.length == 0) {
		userError.style.color = "red";
		userError.innerHTML = "*  Tài khoản không được bỏ trống";
		checkUser = false;
	}else if (name.value.length < 4) {
		userError.style.color = "red";
		userError.innerHTML = "*  Tài khoản phải dài hơn 4 và nhỏ hơn 15 ký tự";
		checkUser = false;
	}else if( name.value.length > 15){
		userError.style.color = "red";
		userError.innerHTML = "*  Tài khoản phải dài hơn 4 và nhỏ hơn 15 ký tự";
		checkUser = false;
	}
	else {
		userError.innerHTML = "";
		checkUser = true;
	}
};

document.getElementById('username').onblur = function () {
	checkSubmit();
	var name = document.getElementById('username');
	var userError = document.getElementById('userError');
	$.ajax({
		url: 'http://localhost:3000/_api/v1/members/checkUser',
		type: 'POST',
		data: {"userName":name.value},				
		success: function(response){
			userError.style.color = "red";
			userError.innerHTML = "*  Tài khoản đã tồn tại";
			checkUser = false;
		},
		error: function(response, message){
			if (checkUser === true) {
				userError.innerHTML = "";
				checkUser = true;
			}	
		}
	});
};

document.getElementById('password').onkeyup = function () {
	checkSubmit();
	var password = document.getElementById ('password');
	var passError = document.getElementById ('passError');
	if (password.value.length = 0) {
		passError.style.color = "red";
		passError.innerHTML = "*  Mật khẩu không được bỏ trống";
		checkPass = false;
	}
	else if (password.value.length < 6) {
		passError.style.color = "red";
		passError.innerHTML = "*  Mật khẩu phải dài hơn 6 và nhỏ hơn 18 ký tự";
		checkPass = false;
	}
	else {
		passError.innerHTML = "";
		checkPass = true;
	}
};

document.getElementById("rePassword").onkeyup = function () {
	checkSubmit();
	var password = document.getElementById('password');
	var rePassword = document.getElementById('rePassword');
	var rePassError = document.getElementById('rePassError');
	if (password.value.length = 0) {
		rePassError.style.color ="red";
		rePassError.innerHTML = "*  Mật khẩu xác nhận không được bỏ trống";
		checkRePass = false;
	}
	else if(password.value != rePassword.value){
		rePassError.style.color ="red";
		rePassError.innerHTML = "*  Mật khẩu xác nhận không khớp";
		checkRePass = false;
	}
	else{
		rePassError.innerHTML = "";
		checkRePass = true;
	}
};

document.getElementById("email").onkeyup = function () {
	checkSubmit();
	var email = document.getElementById('email');
	var emailError = document.getElementById('emailError');
	if (email.value.length = 0) {
		emailError.style.color ="red";
		emailError.innerHTML = "*  Email không được bỏ trống";
		checkEmail = false;
	}else if (email.value.length < 7) {
		emailError.style.color = "red";
		emailError.innerHTML = "*  Tài khoản phải dài hơn 6 và nhỏ hơn 18 ký tự";
		checkEmail = false;
	}else{
		emailError.innerHTML = "";
		checkEmail = true;
	}
};

document.getElementById('email').onblur = function () {
	checkSubmit();
	var email = document.getElementById('email');
	var emailError = document.getElementById('emailError');
	$.ajax({
		url: 'http://localhost:3000/_api/v1/members/checkEmail',
		type: 'POST',
		data: {"email":email.value},				
		success: function(response){
			emailError.style.color = "red";
			emailError.innerHTML = "*  Email đã tồn tại";
			checkEmail = false;
		},
		error: function(response, message){
			if (checkEmail === true) {
				emailError.innerHTML = "";
				checkEmail = true;
			}	
		}
	});
};

document.getElementById("birthDay").onchange = function () {
	var birthDay = document.getElementById('birthDay');
	var birthdayError = document.getElementById('birthdayError');
	var today = new Date();
	today.setFullYear(today.getFullYear()-3);
	birthDay = new Date(birthDay.value);
	if (birthDay > today) {
		checkBirthday = false;
		birthdayError.style.color ="red";
		birthdayError.innerHTML = "*  Ngày sinh không hợp lệ";
		checkSubmit()
	}else{
		checkBirthday = true;
		birthdayError.innerHTML = "";
		checkSubmit()
	}
};

document.getElementById("avatar").onchange = function () {
	var fileUpload = document.getElementById("avatar");
	if (!fileUpload.files[0]) {
		checkAva = false;
		var avaError = document.getElementById("avaError");
		avaError.style.color ="red";
		avaError.innerHTML = "*  Ảnh đại diện không được bỏ trống";
		checkSubmit();
	}else{
		var fd = new FormData();
		fd.append('file', fileUpload.files[0]);
		fd.append('upload_preset','rk1gl1ni');
	    $.ajax({
			url: 'https://api.cloudinary.com/v1_1/sangbeo-aptech/image/upload',
			type: 'POST',
			data: fd,
			cache: false,
		    contentType: false,
		    processData: false,					
			success: function(response){
				checkAva = true;
				document.getElementById("preview").innerHTML='<img id="avatarUrl" src="'+response.secure_url+'" class="img-responsive">';
				checkSubmit()
			},
			error: function(response, message){
				checkAva = false;
				checkSubmit()
			}
		});
	};
};


 $('#registerForm :input[type="submit"]').prop('disabled', true);
 function checkSubmit(){
 	if (checkName === true && checkEmail === true && checkUser === true && checkPass === true && checkRePass === true && checkBirthday === true && checkAva === true) {
 		$('#registerForm :input[type="submit"]').prop('disabled', false);
 	}else{
 		$('#registerForm :input[type="submit"]').prop('disabled', true);
 	};
 };

 function login(){
	var data = {
		"userName":$('#username').val(),
		"password":$('#password').val()
	};
	console.log(data);
	$.ajax({
		url: 'http://localhost:3000/_api/v1/members/login',
		type: 'POST',
		data: data,				
		success: function(response){
			localStorage.members = JSON.stringify(response);
		},
		error: function(response, message){
		}
	});
 };

$('form#registerForm').submit(function(){
	var data = {
		"userName":$('#username').val(),
		"password":$('#password').val(),
		"email":$('#email').val(),
		"fullName":$('#fullName').val(),
		"gender":$('input[name=gender]:checked', '#registerForm').val(),
		"birthDay":$('#birthDay').val(),
		"avatarUrl":$('#avatarUrl').attr('src'),
	};
	console.log(data);
	$.ajax({
		url: 'http://localhost:3000/_api/v1/members',
		type: 'POST',
		data: data,				
		success: function(response){
			login();
			swal({
			  title: "Đăng Ký Thành Công!",
			  icon: "success",
			  text: " ",
			  timer: 2000,
  			  buttons: false
			}).then(function () {
				window.location.href = "index.html";
			});
		},
		error: function(response, message){
			swal({
			  title: "Lỗi!",
			  icon: "error",
			  text: " ",
			  timer: 2000,
  			  buttons: false
			});
		}
	});
});







