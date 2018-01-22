$(document).ready(function() {
    loadProduct();
});

function loadProduct(){
	$.ajax({
		url: "http://localhost:3000/_api/v1/products?page=1&limit=12",
		type: 'GET',				
		success: function(response){
			var content = '';
			var product = response.listProduct;
			for (var i = 0; i < product.length; i++) {
				content +=	'<div class="col-sm-4">';
				content +=		'<div class="product-image-wrapper">';
				content +=			'<div class="single-products">';
				content +=					'<div class="productinfo text-center">';
				content +=						'<img src="'+product[i].Picture1+'" alt="">';
				content +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				content +=						'<p>'+product[i].ProductName+'</p>';
				content +=						'<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
				content +=					'</div>';
				content +=			'</div>';
				content +=			'<div class="choose">';
				content +=				'<ul class="nav nav-pills nav-justified">';
				content +=					'<li><a href="#"><i class="fa fa-plus-square"></i>Thêm vào so sánh</a></li>';
				content +=				'</ul>';
				content +=			'</div>';
				content +=		'</div>';
				content +=	'</div>';
			};
   			$('#list_items').html(content);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}