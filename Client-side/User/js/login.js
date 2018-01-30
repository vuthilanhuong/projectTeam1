$( document ).ready(function() {	
    $('form#loginForm').submit(function(){
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
				swal({
				  title: "Đăng Nhập Thành Công!",
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
				  title: "Tài Khoản Hoặc Mật Khẩu Sai!",
				  icon: "error",
				  text: " ",
				  timer: 2000,
	  			  buttons: false
				});
			}
		});
    });
});