$(document).ready(function() {
    $('form#searchItem').submit(function(){
    	var key = $('#search').val();
    	window.location.href = 'product.html?search='+key;
    });
});