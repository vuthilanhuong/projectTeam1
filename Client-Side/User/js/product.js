$(document).ready(function() {
    loadProduct();
    $('#pagination-demo').twbsPagination({
        totalPages: 8,
        visiblePages: 5,
        startPage: 1	
	});
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function loadProduct(){
	var Brand = getParameterByName('Brand');
	var ProductType = getParameterByName('ProductType');
	var search = getParameterByName('search');
	var query ='';
	if(Brand !== null){
		query = '&Brand='+Brand
	}else if(ProductType !== null){
		query = '&ProductType='+ProductType
	}else if(search !== null){
		query = '&search='+search
	}else{
		query = ''
	};
	$.ajax({
		url: "http://localhost:3000/_api/v1/products?page=1&limit=12"+query,
		type: 'GET',				
		success: function(response){
			var content = '';
			var product = response.listProduct;
			for (var i = 0; i < product.length; i++) {
				content +=	'<div class="col-sm-4">';
				content +=		'<div class="product-image-wrapper">';
				content +=			'<div class="single-products">';
				content +=					'<div class="productinfo text-center">';
				content +=						'<a href="product-details.html?id='+product[i]._id+'"><img src="'+product[i].Picture1+'" alt=""></a>';
				content +=						'<h2>'+product[i].Price+' VNĐ</h2>';
				content +=						'<a href="product-details.html?id='+product[i]._id+'"><p>'+product[i].ProductName+'</p></a>';
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
			var content = '';
			content +=  '<div class="text-center">';
			content +=  '<h2>Lỗi!</h2>';
			content +=  '<br>';
			content +=  '<h4>Không tìm thấy</h4>';
			content +=  '</div>';
			$('#features-items').html(content);
		}
	});
}