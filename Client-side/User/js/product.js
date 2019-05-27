var API_URL ="https://dev20t1808m.herokuapp.com";

$(document).ready(function() {
    loadProduct();
});

function paging(total,page,query){
   $('#pagination-demo').twbsPagination({
	    totalPages: Math.ceil(total/9),
	    visiblePages: 4,
	    startPage: page,
	    initiateStartPageClick:false,
	    prev:'&lt;',
	    next:'&gt;',
	    first: '<<',
        last: '>>',
	    onPageClick: function (event, currentPage) {
	    	location.hash = '?page='+currentPage+query;
	      	loadProduct();
		}		
	});
};

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

function loadProduct(){
	var Brand = getParameterByName('Brand');
	var ProductType = getParameterByName('ProductType');
	var search = getParameterByName('search');
	var page = getParameterByName('page');
	var query ='';
	if(page == null){
		page = 1
	};
	if(Brand !== null){
		query = '&Brand='+Brand;
		$('#'+Brand).addClass("active");
		$('#'+ProductType).removeClass("active");
	}else if(ProductType !== null){
		query = '&ProductType='+ProductType
		$('#'+ProductType).addClass("active");
		$('#'+Brand).removeClass("active");
	}else if(search !== null){
		query = '&search='+search
	}else{
		query = ''
	};
	$.ajax({
		url: API_URL + "/_api/products?page="+page+"&limit=9"+query,
		type: 'GET',				
		success: function(response){
			var content = '';
			var product = response.listProduct;
			for (var i = 0; i < product.length; i++) {
				console.log(response);
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
   			$('#list_items').html(content);
   			paging(response.total,page,query)
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