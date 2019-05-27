/*scroll to top*/
var API_URL ="https://dev20t1808m.herokuapp.com";

$(document).ready(function(){
	scroll();
	checkLogin();
	productSeen();
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
			url: API_URL+ '/_api/getUser/'+secret.userID,
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
			check = false;
			break;
		};	
	};

	if(check === true){
		if(items[5]){
			items = $.grep(items, function(e){
		    	return e._id != items[0]._id; 
			})
		};
		items.push(product);
		console.log(items);
		localStorage.productSeen = JSON.stringify(items);
	};	
};

// Sản phẩm đã xem: lưu trong local-storage
function productSeen() {
	if(localStorage.productSeen !== undefined)
		items = JSON.parse(localStorage.productSeen);
    	var contentItem3 = '';
		var contentItem4 = '';
	   
	    if(items.length == 0) {
	    	$("#productHaveSeen").attr("hidden", true);
	    } 
	    else
	    {
	    	$("#productHaveSeen").attr("hidden", false);
			console.log(items.length);
		    console.log(items);

	    	//thêm vào phần sản phẩm đã xem
				//cục1-thêm vào phần sản phẩm đã xem
				var min = 3;
				if (items.length <3) {
					min = items.length;
				};		
	   			for (var i = 0; i < min; i++) {  
					contentItem3 +=	'<div class="col-sm-4">';
					contentItem3 +=		'<div class="product-image-wrapper">';
					contentItem3 +=			'<div class="single-products">';
					contentItem3 +=					'<div class="productinfo text-center">';
					contentItem3 +=						'<a href="product-details.html?id='+items[i]._id+'" title="'+items[i].ProductName+'"><img src="'+items[i].Picture1+'" alt=""></a>';
					contentItem3 +=						'<h2>'+formatPrice(items[i].Price)+' VNĐ</h2>';
					contentItem3 +=						'<a href="product-details.html?id='+items[i]._id+'" title="'+items[i].ProductName+'"><p>'+items[i].ProductName+'</p></a>';
					contentItem3 +=						'<a href="javascript:void(0)" onclick=\'addCart('+JSON.stringify(items[i])+')\' class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
					contentItem3 +=					'</div>';
					contentItem3 +=			'</div>';
					contentItem3 +=			'<div class="choose">';
					contentItem3 +=				'<ul class="nav nav-pills nav-justified">';
					contentItem3 +=					'<li><a href="javascript:void(0)" onclick=\'compare('+JSON.stringify(items[i])+')\'><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
					contentItem3 +=				'</ul>';
					contentItem3 +=			'</div>';
					contentItem3 +=		'</div>';
					contentItem3 +=	'</div>';
				};
				$('.col-sm-9 #product_seen .item:first-child').html(contentItem3);
				if (items.length < 4) {
					$('.col-sm-9 #product_seen .item:last-child').html(contentItem3);
				};

				// cục 2- thêm vào phần sản phẩm đã xem
				if (items.length > 3) {
					var min = 6;
					if (items.length <6) {
						min = items.length;
					}; 				
					for (var i = 3; i < min; i++) {
						contentItem4 +=	'<div class="col-sm-4">';
						contentItem4 +=		'<div class="product-image-wrapper">';
						contentItem4 +=			'<div class="single-products">';
						contentItem4 +=					'<div class="productinfo text-center">';
						contentItem4 +=						'<a href="product-details.html?id='+items[i]._id+'" title="'+items[i].ProductName+'"><img src="'+items[i].Picture1+'" alt=""></a>';
						contentItem4 +=						'<h2>'+formatPrice(items[i].Price)+' VNĐ</h2>';
						contentItem4 +=						'<a href="product-details.html?id='+items[i]._id+'" title="'+items[i].ProductName+'"><p>'+items[i].ProductName+'</p></a>';
						contentItem4 +=						'<a href="javascript:void(0)" onclick=\'addCart('+JSON.stringify(items[i])+')\' class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
						contentItem4 +=					'</div>';
						contentItem4 +=			'</div>';
						contentItem4 +=			'<div class="choose">';
						contentItem4 +=				'<ul class="nav nav-pills nav-justified">';
						contentItem4 +=					'<li><a href="javascript:void(0)" onclick=\'compare('+JSON.stringify(items[i])+')\'><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
						contentItem4 +=				'</ul>';
						contentItem4 +=			'</div>';
						contentItem4 +=		'</div>';
						contentItem4 +=	'</div>';
					};
					$('.col-sm-9 #product_seen .item:last-child').html(contentItem4);
				}
				
	    	
	    };
	// };   

};

// Sản phẩm liên quan (gợi ý cho người dùng những sản phẩm cùng loại), chỉ lấy 6 sản phẩm đầu tiên thôi
function productRecommended(){

	items = JSON.parse(localStorage.productSeen);
	console.log(localStorage.productDetail);

};