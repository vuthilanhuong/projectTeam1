$(document).ready(function() {
    loadProduct();
    productSeen()
});

var quantityProduct = 1;
var dataProduct = {};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function formatPrice(price){
	var result = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return result;
};

function addProductCart(){
	dataProduct.quantity = $('#quantity').val();
	if(dataProduct.quantity > 0){
		addCart(dataProduct);
	}
};

function loadProduct(){
	var id = getParameterByName('id');
	$.ajax({
		url: "http://localhost:3000/_api/v1/products/"+id,
		type: 'GET',				
		success: function(response){
			console.log(response);
			var content = '';
			dataProduct = response;
			content += '<div class="col-sm-5">';
			content +=		'<div class="view-product">';
			content +=			'<img id="img_01" src="'+response.Picture1+'" data-zoom-image="'+response.Picture1+'" alt="">';
			content +=		'</div>';
			content +=		'<div id="similar-product" class="carousel slide" data-ride="carousel">';
			content +=		   '<div class="carousel">';
			content +=				'<div class="text-center" id="gallery">';
			content +=					'<a href="javascript:void(0)" class="choose-zoom"><img src="'+response.Picture1+'" alt=""></a>';
			content +=					'<a href="javascript:void(0)"><img src="'+response.Picture2+'" alt=""></a>';
			content +=				'</div>';
			content +=			'</div>';
			content +=		'</div>';
			content +=	'</div>';
			content +=	'<div class="col-sm-7">';
			content +=		'<div class="product-information">';
			content +=			'<h1>'+response.ProductName+'</h1>';
			content +=			'<span>';
			content +=				'<span>'+formatPrice(response.Price)+' VND</span>';
			content +=			'</span>';
			content +=			'<p><label>Số Lượng:</label> &nbsp;';
			content +=			'<input id="quantity" type="text" value="1" style="width:40px; text-align: center;">';
			content +=			'<button type="button" onclick="addProductCart()" class="btn btn-fefault cart">';
			content +=				'<i class="fa fa-shopping-cart"></i>';
			content +=				' Cho vào giỏ';
			content +=			'</button></p>';
			content +=			'<p><b>Trạng Thái:</b> '+response.Availability+'</p>';
			content +=			'<p><b>Loại Kính:</b> '+response.ProductType+'</p>';
			content +=			'<p><b>Hãng:</b> '+response.Brand+'</p>';
    		content +=			'<p><b>Kích Thước:</b> '+response.Size+'</p>';
			content +=			'<p><b>Màu Sắc:</b> '+response.Color+'</p>';
			content +=		'</div>';
			content +=	'</div>';
			content +=	'<div><p style="text-align: justify; line-height: 30px;"><b>Mô Tả:&nbsp;</b>'+response.Discribe+'</p></div>';
   			$('#product_details').html(content);
   			$("#img_01").elevateZoom();
   			$('#gallery a img').click(function(e){
   				$('#gallery a').removeClass('choose-zoom');
   				$(this).parent().addClass('choose-zoom');
   				$('#img_01').attr('src',e.target.src);
   				$('#img_01').attr('data-zoom-image',e.target.src);
   				var url = "url("+e.target.src+")";
   				$(".zoomWindowContainer div").css("background-image",url);
   			});
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});



	$.ajax({
		url: "http://localhost:3000/_api/v1/products?page=1&limit=6",
		type: 'GET',				
		success: function(response){
			var contentItem1 = '';
			var contentItem2 = '';
			var product = response.listProduct;
			for (var i = 0; i < 3; i++) {
				product[i].quantity = 1;
				contentItem1 +=	'<div class="col-sm-4">';
				contentItem1 +=		'<div class="product-image-wrapper">';
				contentItem1 +=			'<div class="single-products">';
				contentItem1 +=					'<div class="productinfo text-center">';
				contentItem1 +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><img src="'+product[i].Picture1+'" alt=""></a>';
				contentItem1 +=						'<h2>'+formatPrice(product[i].Price)+' VNĐ</h2>';
				contentItem1 +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><p>'+product[i].ProductName+'</p></a>';
				contentItem1 +=						'<a href="javascript:void(0)" onclick=\'addCart('+JSON.stringify(product[i])+')\' class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				contentItem1 +=					'</div>';
				contentItem1 +=			'</div>';
				contentItem1 +=			'<div class="choose">';
				contentItem1 +=				'<ul class="nav nav-pills nav-justified">';
				contentItem1 +=					'<li><a href="javascript:void(0)" onclick=\'compare('+JSON.stringify(product[i])+')\'><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				contentItem1 +=				'</ul>';
				contentItem1 +=			'</div>';
				contentItem1 +=		'</div>';
				contentItem1 +=	'</div>';
			};
			$('.col-sm-9 #hot_sale .item:first-child').html(contentItem1);

			for (var i = 3; i < 6; i++) {
				product[i].quantity = 1;
				contentItem2 +=	'<div class="col-sm-4">';
				contentItem2 +=		'<div class="product-image-wrapper">';
				contentItem2 +=			'<div class="single-products">';
				contentItem2 +=					'<div class="productinfo text-center">';
				contentItem2 +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><img src="'+product[i].Picture1+'" alt=""></a>';
				contentItem2 +=						'<h2>'+formatPrice(product[i].Price)+' VNĐ</h2>';
				contentItem2 +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><p>'+product[i].ProductName+'</p></a>';
				contentItem2 +=						'<a href="javascript:void(0)" onclick=\'addCart('+JSON.stringify(product[i])+')\' class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				contentItem2 +=					'</div>';
				contentItem2 +=			'</div>';
				contentItem2 +=			'<div class="choose">';
				contentItem2 +=				'<ul class="nav nav-pills nav-justified">';
				contentItem2 +=					'<li><a href="javascript:void(0)" onclick=\'compare('+JSON.stringify(product[i])+')\'><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				contentItem2 +=				'</ul>';
				contentItem2 +=			'</div>';
				contentItem2 +=		'</div>';
				contentItem2 +=	'</div>';
			};
			$('.col-sm-9 #hot_sale .item:last-child').html(contentItem2);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
};

//hàm thêm vào sản phẩm bạn đã xem
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
