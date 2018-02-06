$(document).ready(function() {
	loadCompare();
});

function formatPrice(price){
	var result = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return result;
};

function loadCompare(){
    var productArray = [];
    if(localStorage.compare === undefined || JSON.parse(localStorage.compare).length == 0){
		var content = '';
			content +=  '<div class="text-center">';
			// content +=  '<h2>Lỗi!</h2>';
			// content +=  '<br>';
			content +=  '<h4>Chưa có sản phẩm để so sánh!</h4>';
			content +=  '</div>';
    	$('#tableCompare .row .col-md-10').html(content);
    }else{
    	console.log(localStorage.compare.length);
    	productArray = JSON.parse(localStorage.compare);
    	var productImg ='<td class="titleCompare">Ảnh</td>';
		var productName ='<th class="text-center">Tên Sản Phẩm</th>';
		var productPrice ='<td class="titleCompare">Giá</td>';
		var productType = '<td class="titleCompare">Loại Kính</td>';
		var productBrand = '<td class="titleCompare">Hãng</td>';
		var productSize ='<td class="titleCompare">Kích Thước</td>';
		var productColor ='<td class="titleCompare">Màu Sắc</td>';
		var productDiscribe = '<td class="titleCompare">Mô Tả</td>';
	    for (var i = 0; i < productArray.length; i++) {
			productName += '<th class="text-center ProductName" style="position:relative;">'+productArray[i].ProductName+'<a class="remove" onclick="deleteProduct(\''+productArray[i]._id+'\')" href="javascript:void(0)"><i class="fa fa-times" aria-hidden="true"></i></a></th>';
	    	productImg += '<td><img src="'+productArray[i].Picture1+'" class="imgTable"></td>';
	    	productPrice += '<td class="priceTable">'+formatPrice(productArray[i].Price)+' VNĐ</td>';
	    	productType += '<td>'+productArray[i].ProductType+'</td>';
	    	productBrand += '<td>'+productArray[i].Brand+'</td>';
	    	productSize +='<td>'+productArray[i].Size+'</td>';
	    	productColor +='<td>'+productArray[i].Color+'</td>';
	    	productDiscribe +='<td class="discribe">'+productArray[i].Discribe+'</td>';
	    };
		$('#productImg').html(productImg);
	    $('#productName').html(productName);
	    $('#productPrice').html(productPrice);
	    $('#productType').html(productType);
	    $('#productBrand').html(productBrand);
	    $('#productSize').html(productSize);
	    $('#productColor').html(productColor);
	    $('#productDiscribe').html(productDiscribe);
    };
};

function deleteProduct(idItem){
	var data = JSON.parse(localStorage.compare);
	data = $.grep(data, function(e){
		console.log(e); 
    	return e._id != idItem; 
	});
	localStorage.compare = JSON.stringify(data);
	loadCompare();
};