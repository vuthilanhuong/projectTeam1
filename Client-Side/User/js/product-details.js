var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products";
console.log(location.hash);
$(document).ready(function(){

	// window.location.replace
	// console.log(location.hash);

	var productID = "5a5d9e91bf4d5d114890d12b";
	loadProduct(productID);
});

//Hàm load sản phẩm
function loadProduct(productID){
	$.ajax({
		url: PRODUCT_API_URL+'/'+ productID,
		type: 'GET',				
		success: function(response){
			
			var content = '';	
					content +=	'<div class="col-sm-7">';
					content +=	'<div class="view-product">';
					content +=		'<img src="'+ response.Picture1 +'" alt="" />';
					content +=	'</div>';
					content +=	'<div id="similar-product" class="carousel slide" data-ride="carousel">';
					content +=		    '<div class="carousel-inner">';
					content +=				'<div class="item active">';
					// content +=				  '<a href=""><img style="height:268 " style="width: 349" src="' + response.Picture1 + '" alt=""></a>';
					// content +=				  '<a href=""><img src="' + response.Picture + '" alt=""></a>';
					content +=				'</div>';
					content +=			'</div>';
					content +=	'</div>';
					content +=	'</div>';
					content +='<div class="col-sm-5">';
					content +=		'<div class="product-information">';
					content +=			'<span>';
					content +=				'<button type="button" class="btn btn-fefault cart">';
					content +=					'<i class="fa fa-shopping-cart"></i>';
					content +=					'Thêm Vào Giỏ Hàng';
					content +=				'</button>';
					content +=			'</span>';
					content +=			'<div id="result2">';
			        content +=    		'</div>';
					content +=			'<p><b>ProductID:&nbsp;'+productID+'</b> </p>';
					content +=			'<p><b>Tên Sản Phẩm:&nbsp;'+response.ProductName+'</b> </p>';
					content +=			'<p><b>Giá:&nbsp;'+response.Price+'</b> </p>';
					content +=			'<p><b>Hãng Sản Xuất:&nbsp;'+response.Brand+'</b> </p>';
					content +=			'<p><b>Kích Thước:&nbsp;'+response.Size+'</b> </p>';
					content +=			'<p><b>Màu Sắc:&nbsp;'+response.Color+'</b> </p>';
					content +=			'<p><b>Tình :&nbsp;'+response.Availability+'</b> </p>';
					content +=			'<p><b>Mô Tả Về Sản Phẩm:&nbsp;'+response.Discribe+'</b> </p>';
					content +=		'</div><!--/product-information-->';
					content +=	'</div>';

   			$('#result').html(content);


		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}



				$(".btn").click(function(){
				    alert("The paragraph was clicked.");
				});






