$(document).ready(function() {
    $('form').submit(function(){
    	var key = $('#search').val();
    	window.location.href = 'product.html?search='+key;
    });
});