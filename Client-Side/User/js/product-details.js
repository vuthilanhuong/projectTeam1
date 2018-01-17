


function loadProduct(page, limit){
	$.ajax({
		url: "http://localhost:3000/_api/v1/products/"+ listProduct[i]._id,
		type: 'GET',				
		success: function(response){
			
			var listProduct = response.listProduct;
			var content = '';
			console.log(listProduct.length);
			for (var i = 0; i < 9; i++) {
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

			};						

   			
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






