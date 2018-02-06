$(document).ready(function(){
	var checkUser = false;
	var checkTitle = false;
	var checkMessage = false;
	$( "#btnSubmit" ).prop( "disabled", true );	
		$( "form#main-contact-form" ).submit(function(){
			alert("Bạn đã gửi mail thành công!");			
	});	
});

function checkSubmit(){
	if (checkUser !== undefined  && checkTitle !== undefined && checkMessage !== undefined ){
		if (checkUser === true && checkTitle === true && checkMessage === true) {
			$( "#btnSubmit" ).prop( "disabled", false );
		};
	};	
};

function validateUser(){
	var user = document.getElementById("username");
	var userError = document.getElementById("username-error");
	if(user.value.length == 0) {
		userError.style.color = "red";
		userError.innerHTML = "Vui lòng nhập tên vào đây";
	}else if(user.value.length < 7){
		userError.style.color = " red";
		userError.innerHTML = "Tên phải dài hơn 7 kí tự";
	}else{
		userError.style.color = "green";
		userError.innerHTML = "Tên hợp lệ";
		checkUser = true;
		console.log(checkUser);
	};
	checkSubmit();
};

function validateTitle(){
	var title = document.getElementById("title");
	var titleError = document.getElementById("title-error");
	if(title.value.length == 0){
		titleError.style.color = "red";
		titleError.innerHTML = "Vui lòng nhập chủ đề";
	}else{
		titleError.style.color = "green";
		titleError.innerHTML = "Hợp lệ";
		checkTitle = true;
		console.log(checkTitle);
	};
	checkSubmit();
};	

function validateMessage(){
	var message = document.getElementById("message");
	var messageError = document.getElementById("message-error");
	if(message.value.length > 200) {
		messageError.style.color = "red";
		messageError.innerHTML = "Không nhập quá 200 kí tự";		
	}else {
		checkMessage = true;
		console.log(checkMessage);
	};
	checkSubmit();
};

$(document).ready(function(){
	var checkUser = false;
	var checkTitle = false;
	var checkMessage = false;
	$( "#btnSubmit" ).prop( "disabled", true );	
});

function checkSubmit(){
	if (checkUser !== undefined  && checkTitle !== undefined && checkMessage !== undefined ){
		if (checkUser === true && checkTitle === true && checkMessage === true) {
			$( "#btnSubmit" ).prop( "disabled", false );
		};
	};	
};

$("#btnSubmit").click( function (){
	alert("Bạn đã gửi mail thành công!");
	})
