function compare(product){
	var item = [];
	if(localStorage.compare !== undefined)
	item = JSON.parse(localStorage.compare);
	if(item[2]){
		item = $.grep(item, function(e){
	    	return e._id != item[0]._id; 
		})
	};
	item.push(product);
	localStorage.compare = JSON.stringify(item);
};
