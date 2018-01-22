$(document).ready(function() {
    loadProduct();
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
	var id = getParameterByName('id');
	$.ajax({
		url: "http://localhost:3000/_api/v1/products/"+id,
		type: 'GET',				
		success: function(response){
			console.log(response);
			var content = '';
			content += '<div class="col-sm-5">';
			content +=		'<div class="view-product">';
			content +=			'<img src="images/product-details/1.jpg" alt="">';
			content +=		'</div>';
			content +=		'<div id="similar-product" class="carousel slide" data-ride="carousel">';
			content +=		   '<div class="carousel">';
			content +=				'<div class="text-center">';
			content +=					'<a href=""><img src="'+response.Picture1+'" alt=""></a>';
			content +=					'<a href=""><img src="'+response.Picture2+'" alt=""></a>';
			content +=				'</div>';
			content +=			'</div>';
			content +=		    '<a class="left item-control" href="#similar-product" data-slide="prev">';
			content +=				'<i class="fa fa-angle-left"></i>';
			content +=		    '</a>';
			content +=		    '<a class="right item-control" href="#similar-product" data-slide="next">';
			content +=				'<i class="fa fa-angle-right"></i>';
			content +=		    '</a>';
			content +=		'</div>';
			content +=	'</div>';
			content +=	'<div class="col-sm-7">';
			content +=		'<div class="product-information">';
			content +=			'<img src="images/product-details/new.jpg" class="newarrival" alt="">';
			content +=			'<h2>Anne Klein Sleeveless Colorblock Scuba</h2>';
			content +=			'<span>';
			content +=				'<span>'+response.Price+' VND</span>';
			content +=			'</span>';
			content +=			'<p><label>Quantity:</label>';
			content +=			'<input type="text" value="3">';
			content +=			'<button type="button" class="btn btn-fefault cart">';
			content +=				'<i class="fa fa-shopping-cart"></i>';
			content +=				' Cho vào giỏ';
			content +=			'</button></p>';
			content +=			'<p><b>Trạng Thái:</b> '+response.Availability+'</p>';
			content +=			'<p><b>Loại Kính:</b> '+response.ProductType+'</p>';
			content +=			'<p><b>Hãng:</b> '+response.Brand+'</p>';
    		content +=			'<p><b>Kích Thước:</b> '+response.Size+'</p>';
			content +=			'<p><b>Màu Sắc:</b> '+response.Color+'</p>';
    		content +=			'<p><b>Mô Tả:</b> '+response.Discribe+'</p>';
			content +=		'</div>';
			content +=	'</div>';
   			$('#product_details').html(content);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}