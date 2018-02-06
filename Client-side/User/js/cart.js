$(document).ready(function() {
    cart();
});
//fomat định dạng VND
function formatPrice(price){
	var result = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	return result;
};
//Hàm chính 
function cart(){
	var items = [];
	if (localStorage.cart === undefined || JSON.parse(localStorage.cart).length == 0) {
		var content = '';
			content +=  '<div class="text-center">';
			// content +=  '<h2>Thông báo</h2>';
			// content +=  '<br>';
			content +=  '<h4>Hiện chưa có sản phẩm trong giỏ hàng!</h4>';
			content +=  '</div>';
    	$('#indexCart').html(content);
    	$('#indexCheckout').html(content);
	}else{
		items = JSON.parse(localStorage.cart);
		var totalPrice = 0;
		var totalCart = 0
		var content ='';
		var contentTotalPrice = '';
		for (var i = 0; i < items.length; i++) {
			totalPrice = Math.ceil(items[i].Price*items[i].quantity);
			if(items[i].quantity<1)
			items[i].quantity = 1;
			content += 	'<tr>';
			content += 		'<td class="cart_product">';
			content += 			'<a href="javascript:void(0)"><img src="'+items[i].Picture1+'" width="100" alt=""></a>';
			content += 		'</td>';
			content += 		'<td class="cart_description">';
			content += 			'<h4><a href="javascript:void(0)">'+items[i].ProductName+'</a></h4>';
			content += 			'<p class="productID">ID: '+items[i]._id+'</p>';
			content += 		'</td>';
			content += 		'<td class="cart_price">';
			content += 			'<p>'+formatPrice(items[i].Price)+' VNĐ</p>';
			content += 		'</td>';
			content += 		'<td class="cart_quantity">';
			content += 			'<div class="cart_quantity_button">';
			content += 				'<a class="cart_quantity_up editQuantity" onclick="$(this).next().val(Number(Number($(this).next().val())+1))" href="javascript:void(0)"> + </a>';
			content += 				'<input class="cart_quantity_input" type="text" name="quantity" value="'+items[i].quantity+'" autocomplete="off" size="2">';
			content += 				'<a class="cart_quantity_down editQuantity" onclick="$(this).prev().val(Number(Number($(this).prev().val())-1))" href="javascript:void(0)"> - </a>';
			content += 			'</div>';
			content += 		'</td>';
			content += 		'<td class="cart_total">';
			content += 			'<p class="cart_total_price">'+formatPrice(totalPrice)+' VNĐ</p>';
			content += 		'</td>';
			content += 		'<td class="cart_delete">';
			content += 			'<a class="cart_quantity_delete" href="javascript:void(0)"><i class="fa fa-times"></i></a>';
			content += 		'</td>';
			content += 	'</tr>';
			totalCart = totalCart + totalPrice; 
		};
		contentTotalPrice +=	'<tr id="totalCartPrice">';
		contentTotalPrice +=		'<td colspan="3">&nbsp;</td>';
		contentTotalPrice +=		'<td colspan="3">';
		contentTotalPrice +=			'<table class="table table-condensed total-result">';
		contentTotalPrice +=				'<tr>';
		contentTotalPrice +=					'<td>Tổng tiền</td>';
		contentTotalPrice +=					'<td id="totalCart"><span>'+formatPrice(totalCart)+' VNĐ</span></td>';
		contentTotalPrice +=				'</tr>';
		contentTotalPrice +=			'</table>';
		contentTotalPrice +=		'</td>';
		contentTotalPrice +=	'</tr>';
		$('#cartTable').html(content);
		$('tbody tr:last-child').after(contentTotalPrice);
		$('#cartTable').on('click', '.cart_quantity_delete', function() {					
				var idItem = $(this).parent().parent().children('.cart_description').children('.productID').text().replace('ID: ', '');
				items = $.grep(items, function(e){ 
			    	return e._id != idItem; 
				});
				localStorage.cart = JSON.stringify(items);
				cart();			
		});

		$('#cartTable').on('mouseleave', 'input.cart_quantity_input', function() {
			var priceProduct = $(this).parent().parent().parent().children('.cart_price').children('p').text().replace(' VNĐ', '');
				priceProduct = priceProduct.replace(/[.]/g, '');
			var id = $(this).parent().parent().parent().children('.cart_description').children('.productID').text().replace('ID: ', '');
			var quantityCart = $(this).val();
			if (quantityCart < 1){
				$.notify({
					icon: 'fa fa-warning',
					message: 'Số lượng không thể nhỏ hơn 1'
				},{
					delay: 2000,
					type: "danger",
					placement: {
						from: "top",
						align: "right"
					}
				});
				$(this).val(1);
				quantityCart = 1;
				$(this).parent().parent().parent().children('.cart_total').html('<p class="cart_total_price">'+formatPrice(priceProduct)+' VNĐ</p>');
				cart();
			}else if(jQuery.type(Number($(this).val())) !== "number"){
				$.notify({
					icon: 'fa fa-warning',
					message: 'Số lượng phải là chữ số'
				},{
					delay: 2000,
					type: "danger",
					placement: {
						from: "top",
						align: "right"
					}
				});
				$(this).val(1);
				$(this).parent().parent().parent().children('.cart_total').html('<p class="cart_total_price">'+formatPrice(priceProduct)+' VNĐ</p>');
				cart();
			}else{
				$(this).parent().parent().parent().children('.cart_total').html('<p class="cart_total_price">'+formatPrice(Math.ceil(priceProduct*quantityCart))+' VNĐ</p>');
				cart();
			};
			for (var i = 0; i < items.length; i++) {
				if (items[i]._id == id) {
					items[i].quantity = quantityCart;
					localStorage.cart = JSON.stringify(items);
				};
			};
		});
		$('#cartTable').on('click', '.editQuantity', function() {
			var id = $(this).parent().parent().parent().children('.cart_description').children('.productID').text().replace('ID: ', '');
			var priceProduct = $(this).parent().parent().parent().children('.cart_price').children('p').text().replace(' VNĐ', '');
				priceProduct = priceProduct.replace(/[.]/g, '');
			var quantityCart = $(this).parent().children('.cart_quantity_input').val();
			if (quantityCart < 1){
				$.notify({
					icon: 'fa fa-warning',
					message: 'Số lượng không thể nhỏ hơn 1 và phải'
				},{
					delay: 2000,
					type: "danger",
					placement: {
						from: "top",
						align: "right"
					}
				});
				$(this).parent().children('.cart_quantity_input').val(1);
				$(this).parent().parent().parent().children('.cart_total').html('<p class="cart_total_price">'+formatPrice(priceProduct)+' VNĐ</p>');
				cart();
			}else{
				$(this).parent().parent().parent().children('.cart_total').html('<p class="cart_total_price">'+formatPrice(Math.ceil(priceProduct*quantityCart))+' VNĐ</p>');
				cart();
			};
			for (var i = 0; i < items.length; i++) {
				if (items[i]._id == id) {
					items[i].quantity = quantityCart;
					localStorage.cart = JSON.stringify(items);
				};
			};
		});
	};
	
};
