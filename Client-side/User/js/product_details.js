var API_URL ="https://dev20t1808m.herokuapp.com";

//1. main function
$(document).ready(function() {
    loadProduct();
    productSeen();
    productRecommended();
});

//2.

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

//4. Định dạng giá theo VND( tách số bằng dấu chấm)
function formatPrice(price){
	var result = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return result;
};

//5. Hàm thêm sản phẩm vào giỏ hàng
function addProductCart(){
	dataProduct.quantity = $('#quantity').val();
	if(dataProduct.quantity > 0){
		addCart(dataProduct);
	}
};

//6. Hiện chi tiết 1 sản phẩm đang xem
function loadProduct(){
	var id = getParameterByName('id');

	//6.1 load dữ liệu chi tiết của 1 sản phẩm
	$.ajax({
		url: API_URL+ "/_api/products/"+id,
		type: 'GET',				
		success: function(response){
			localStorage.productDetail = JSON.stringify(response);
			console.log("this is my id:" + id);
			console.log(response.Picture1);
			console.log(JSON.stringify(response));

			console.log(response);
			var content = '';
			dataProduct = response;
			content += '<div class="col-sm-5">';
			content +=		'<div class="view-product">';
			content +=			'<img onclick=\'addSeen('+ JSON.stringify(response) +')\' id="img_01" src="'+response.Picture1+'" data-zoom-image="'+response.Picture1+'" alt="">';
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
			content +=			'<p><b>Loại:</b> '+response.ProductType+'</p>';
			content +=			'<p><b>Danh mục:</b> '+response.Brand+'</p>';
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


	//6.2 load dữ liệu của sản phẩm liên quan
	var ProductDetail = JSON.parse(localStorage.productDetail);

	//tạo thư viện
	var dictionary = {
		"Thiết Kế Logo" : "thiet-ke-logo",
		"Danh Thiếp Văn Phòng Phẩm":"danh-thiep-van-phong-pham",
		"Thiết Kế Brochure":"thiet-ke-brochure",
		"Thiết Kế Web & Di Động":"thiet-ke-web-va-di-dong",
		"Lập Trình Web":"lap-trinh-web",
		"Ứng Dụng Di Động & Web":"ung-dung-di-dong-va-web",
		"Xây Dựng Trang Web & CMS":"xay-dung-trang-web-va-cms",

	};

	console.log(dictionary[ProductDetail.ProductType]);
	$.ajax({
		url: API_URL + "/_api/products?ProductType="+ dictionary[ProductDetail.ProductType]+"?page=1&limit=6",
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
