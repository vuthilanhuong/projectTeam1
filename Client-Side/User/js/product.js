var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products";
var DEFAUL_PAGE = 1;
var DEFAUL_LIMIT = 4;

$(document).ready(function(){	
	var page = Number(getUrlParameter('page'));
	var limit = Number(getUrlParameter('limit'));
	if(isNaN(page)){
		page = DEFAUL_PAGE;
	}
	if(isNaN(limit)){
		limit = DEFAUL_LIMIT;
	}	
	loadProduct(page, limit);
});

function loadProduct(page, limit){
	$.ajax({
		url: PRODUCT_API_URL + '?page=' + page + '&limit=' + limit,
		type: 'GET',				
		success: function(response){
			var listProduct = response.listProduct;
			var totalPage = response.totalPage;
			var content = '';
			for (var i = 0; i < listProduct.length; i++) {
				var id = listProduct[i]._id;			
				content +='<div class="col-sm-4">';
				content +=	'<div class="product-image-wrapper">';
				content +=		'<div class="single-products">';
				content +=			'<div class="productinfo text-center">';
				content +=				'<a href="product-details.html?id='+id+'">';
				content +=					'<img title="'+ '" src="'+ listProduct[i].Picture1 +'" alt="" />';
				content +=					'<h2>'+ listProduct[i].Price + '</h2>';
				content +=					'<p>'+ listProduct[i].ProductName + '</p>';
				content +=				'</a>';
				content +=				'<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm Vào Giỏ</a>';
				content +=			'</div>';
				content +=		'</div>';
				content +=	'</div>';
				content +='</div>';
			}

			var paginateContent = '';
			if(page > 1){
				paginateContent += '<li><a href="?page=1&limit=' + limit + '" aria-label="First"><span aria-hidden="true"><<</span></a></li>';
				paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '" aria-label="Previous"><span aria-hidden="true"><</span></a></li>';
			}
			if(page > 2){
				paginateContent += '<li><a href="?page=' + (page - 2) + '&limit=' + limit + '">' + (page - 2) + '</a></li>';
			}
			if(page > 1){
				paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '">' + (page - 1) + '</a></li>';
			}
			paginateContent += '<li class="active"><a href="?page=' + page + '">' + page + '</a></li>';			
			if(totalPage > page){
				paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '">' + (page + 1) + '</a></li>';	
			}
			if((totalPage - 1) > page){
				paginateContent += '<li><a href="?page=' + (page + 2) + '&limit=' + limit + '">' + (page + 2) + '</a></li>';	
			}
			if(page < totalPage){
				paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '" aria-label="Next"><span aria-hidden="true">></span></a></li>';
				paginateContent += '<li><a href="?page=' + (totalPage) + '&limit=' + limit + '" aria-label="Last"><span aria-hidden="true">>></span></a></li>';
			};

			$('#result').html(content);
   			$('.pagination').html(paginateContent);
			
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}


// Lấy tham số truyền lên trong url theo tên.
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),  	
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
     
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }

};