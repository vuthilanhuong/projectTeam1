/*scroll to top*/

$(document).ready(function(){
	scroll();
	checkLogin();
    $('form#searchItem').submit(function(){
    	var key = $('#search').val();
    	window.location.href = 'product.html?search='+key;
    });
    var height = $(window).height() - 296;
	$('body section').css('min-height',height);
	$("#loadAjax").css("height",$(window).height());
	$(window).resize(function(){
		height = $(window).height() - 296;
		$('body section').css('min-height',height);
		$("#loadAjax").css("height",$(window).height());
	});
	$('body section').css('min-height',height);
});


//hàm cuộn trang
function scroll() {
	$.scrollUp({
        scrollName: 'scrollUp', // Element ID
        scrollDistance: 300, // Distance from top/bottom before showing element (px)
        scrollFrom: 'top', // 'top' or 'bottom'
        scrollSpeed: 300, // Speed back to top (ms)
        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
        animation: 'fade', // Fade, slide, none
        animationSpeed: 200, // Animation in speed (ms)
        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
		//scrollTarget: false, // Set a custom target element for scrolling to the top
        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
        scrollTitle: false, // Set a custom <a> title if required.
        scrollImg: false, // Set true to use image
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647 // Z-Index for the overlay
	});
};

//hàm thêm vào sản phẩm so sánh 
function compare(product){
	var item = [];
	var check = true;
	if(localStorage.compare !== undefined)
	item = JSON.parse(localStorage.compare);
	for (var i = 0; i < item.length; i++) {
		if(item[i]._id == product._id){
			$.notify({
				icon: 'fa fa-warning',
				message: 'Sản phẩm đã tồn tại trong so sánh'
			},{
				delay: 2000,
				type: "danger",
				placement: {
					from: "top",
					align: "right"
				}
			});
			check = false;
			break;
		}
	};
	if(check === true){
		if(item[2]){
			item = $.grep(item, function(e){
		    	return e._id != item[0]._id; 
			})
		};
		item.push(product);
		localStorage.compare = JSON.stringify(item);
		$.notify({
			icon: 'fa fa-check',
			message: 'Đã thêm vào so sánh. Click để xem',
			url: 'compare.html'
		},{
			delay: 2000,
			type: "success",
			placement: {
				from: "top",
				align: "right"
			}
		});
	}	
};


function checkLogin(){
	if (localStorage.members !== undefined) {
		var secret = JSON.parse(localStorage.members);
        $("#loadAjax").css("display", "block");
		$.ajax({
			url: 'http://localhost:3000/_api/v1/getUser/'+secret.userID,
			type: 'GET',
			headers: {
				"Authorization": secret.token
			},			
			success: function(response){
				var content ='';
				content += '<li class="user">Xin chào, '+response.userName+'</li>';
				content += '<li><a href="javascript:void(0)" id="logOut"><i class="fa fa-sign-out"></i>Đăng Xuất</a></li>';
				$('#menu-bar').html($('#menu-bar').html() + content);
				$('#login').css('display','none');
				$('#logOut').click(function(){
			    	if(confirm("Bạn có chắc chắn đăng xuất?")){
			            localStorage.removeItem("members");
			            localStorage.removeItem("cart");
			            window.location.reload();	
			        }
			    });
		        $("#loadAjax").css("display", "none");
			},
			error: function(response, message){
				localStorage.removeItem("members");
		        $("#loadAjax").css("display", "none");
			}
		});
	}else{
		$("#loadAjax").css("display", "none");
	}
};

//thêm vào giỏ hàng
function addCart(product){
	var items = [];
	var check = true;
	if(localStorage.cart !== undefined)
	items = JSON.parse(localStorage.cart);
	for (var i = 0; i < items.length; i++) {
		if(items[i]._id == product._id){
			items[i].quantity = Number(Number(items[i].quantity) + 1);
			localStorage.cart = JSON.stringify(items);
			$.notify({
				icon: 'fa fa-check',
				message: 'Đã thêm vào giỏ hàng. Click để xem',
				url: 'cart.html'
			},{
				delay: 2000,
				type: "success",
				placement: {
					from: "top",
					align: "right"
				}
			});
			check = false;
			break;
		}
	};
	if(check === true){
		items.push(product);
		localStorage.cart = JSON.stringify(items);
		$.notify({
			icon: 'fa fa-check',
			message: 'Đã thêm vào giỏ hàng. Click để xem',
			url: 'cart.html'
		},{
			delay: 2000,
			type: "success",
			placement: {
				from: "top",
				align: "right"
			}
		});
	}	
};

//thêm vào đã xem
function addSeen(product){
	var items = [];
	var check = true;
	if(localStorage.productSeen !== undefined)
		items = JSON.parse(localStorage.productSeen);

	//kiểm tra đã tồn tại chưa?
	for (var i = 0; i < items.length; i++) {
		if(items[i]._id == product._id){
			localStorage.productSeen = JSON.stringify(items);			
			check = false;
			break;
		}
	};

	//nếu chưa tồn tại thì push thêm vào, 
	//độ dài tối đa là 6, vì vậy nếu đã có 6 sản phẩm rồi thì đẩy sản phẩm đầu tiên ra
	if(check === true){
		if(items.length == 6) {
			alert("dai 6 san pham roi");
			for (var i = 0; i < 5; i++) {
				items[i] = items[i+1]
			};
			items[5] = product;
			localStorage.productSeen = JSON.stringify(items);
		}else{
			items.push(product);
			localStorage.productSeen = JSON.stringify(items);
		};
	};	
};