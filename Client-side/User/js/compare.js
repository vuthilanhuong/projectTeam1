function compare(product){
	var item = [];
	var check = true;
	if(localStorage.compare !== undefined)
	item = JSON.parse(localStorage.compare);
	for (var i = 0; i < item.length; i++) {
		if(item[i]._id == product._id){
			$.notify({
				icon: 'fa fa-warning',
				message: 'Sản phẩm đã tồn tại trong so sánh'
			},{
				delay: 2000,
				type: "danger",
				placement: {
					from: "top",
					align: "right"
				}
			});
			check = false;
			break;
		}
	};
	if(check === true){
		if(item[2]){
			item = $.grep(item, function(e){
		    	return e._id != item[0]._id; 
			})
		};
		item.push(product);
		localStorage.compare = JSON.stringify(item);
		$.notify({
			icon: 'fa fa-check',
			message: 'Đã thêm vào so sánh. Click để xem',
			url: 'compare.html'
		},{
			delay: 2000,
			type: "success",
			placement: {
				from: "top",
				align: "right"
			}
		});
	}	
};
