var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products/";
var productID = "5a5d9e91bf4d5d114890d12b";

$(document).ready(function(){		
	loadProduct();
});

function loadProduct(){
	$.ajax({
		url: PRODUCT_API_URL + productID,
		type: 'GET',				
		success: function(response){

			
			$('#ProductID').html("Mã sản phẩm: "+ response.ProductName);


			var content = '';


				var id = listProduct[i]._id;		

					content +=	'<div class="col-sm-5">';
					content +=	'<div class="view-product">';
					content +=		'<img src="images/product-details/1.jpg" alt="" />';
					content +=	'</div>';
					content +=	'<div id="similar-product" class="carousel slide" data-ride="carousel">';
					content +=		    '<div class="carousel-inner">';
					content +=				'<div class="item active">';
					content +=				  '<a href=""><img src="images/product-details/similar1.jpg" alt=""></a>';
					content +=				  '<a href=""><img src="images/product-details/similar2.jpg" alt=""></a>';
					content +=				'</div>';
					content +=			'</div>';
					content +=	'</div>';

									

   			
   			$('#result').html(content);
				// $(".btn").click(function(){
				//     alert("The paragraph was clicked.");
				// });

			// $('#result').html(content);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}



				$(".btn").click(function(){
				    alert("The paragraph was clicked.");
				});






