var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products/";

$(document).ready(function() {
    loadProduct(); 
    productSeen();
});


function formatPrice(price){
	var result = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return result;
};

function loadProduct(){
	$.ajax({
		url: "http://localhost:3000/_api/v1/products?page=1&limit=9",
		type: 'GET',				
		success: function(response){
			var content = '';
			var contentItem1 = '';
			var contentItem2 = '';					

			var product = response.listProduct;
			for (var i = 0; i < product.length; i++) {
				product[i].quantity = 1;
				content +=	'<div class="col-sm-4">';
				content +=		'<div class="product-image-wrapper">';
				content +=			'<div class="single-products">';
				content +=					'<div class="productinfo text-center">';
				content +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><img onclick=\'addSeen('+JSON.stringify(product[i])+')\' src="'+product[i].Picture1+'" alt=""></a>';
				content +=						'<h2>'+formatPrice(product[i].Price)+' VNĐ</h2>';
				content +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><p>'+product[i].ProductName+'</p></a>';
				content +=						'<a href="javascript:void(0)" onclick=\'addCart('+JSON.stringify(product[i])+')\' class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				content +=					'</div>';
				content +=			'</div>';
				content +=			'<div class="choose">';
				content +=				'<ul class="nav nav-pills nav-justified">';
				content +=					'<li><a href="javascript:void(0)" onclick=\'compare('+JSON.stringify(product[i])+')\'><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				content +=				'</ul>';
				content +=			'</div>';
				content +=		'</div>';
				content +=	'</div>';
			};
   			$('#features_items').html(content);

   			//thêm vào sản phẩm bán chạy
   			for (var i = 0; i < 3; i++) {
   				product[i].quantity = 1;
				contentItem1 +=	'<div class="col-sm-4">';
				contentItem1 +=		'<div class="product-image-wrapper">';
				contentItem1 +=			'<div class="single-products">';
				contentItem1 +=					'<div class="productinfo text-center">';
				contentItem1 +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><img onclick=\'addSeen('+JSON.stringify(product[i])+')\' src="'+product[i].Picture1+'" alt=""></a>';
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
				contentItem2 +=						'<a href="product-details.html?id='+product[i]._id+'" title="'+product[i].ProductName+'"><img onclick=\'addSeen('+JSON.stringify(product[i])+')\' src="'+product[i].Picture1+'" alt=""></a>';
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
}

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