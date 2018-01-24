var mongoose = require('mongoose');
var Product = require('../models/product');
var Order = require('../models/order');
var OrderDetail = require('../models/order_detail');
const Transaction = require('mongoose-transactions'); // phải chạy 
// lệnh npm install mongoose-transactions --save

exports.saveCart = function(req, resp){
	var listOrderProducts = JSON.parse(req.body.products);
	//B1:
	//- 1.1 lấy hết id trong order truyền lên và lưu vào 1 mảng
	//- 1.2 dùng map để sau truy vấn cho nhanh

		// Lấy productId từ trong cart truyền lên, tạo ra một mảng các objectId.
		var ids = [];
		var mapProduct = {}; // Lưu map product để lấy số lượng sản phẩm về sau.
		for (var i = 0; i < listOrderProducts.length; i++) {
			//dùng map để gán id với số lượng
			mapProduct[listOrderProducts[i].id] = listOrderProducts[i].quantity;
					
			//chuyển id của product sang định dạng object trong mongoose=> để push vào mảng ids
			var objectId = mongoose.Types.ObjectId(listOrderProducts[i].id);		
			ids.push(objectId);
		}	

	//B2:
	

	// Tìm các sản phẩm nằm trong danh sách id truyền lên.
	Product.find({
	    '_id': { $in: ids}
	}, function(err, productResult){

		var orderDetailArray = [];
		var totalPrice = 0;

		// Tạo đối tượng order.
		var order = new Order({
			_id: mongoose.Types.ObjectId(), //thay vì để id tự sinh thì ta gán trực tiếp
			customerId: 'lay_tu_credentail_user_id',
			shipName: 'Ship Name',
			totalPrice: 0,
			status: 2
		});

		// Tạo mảng order detail. Tính totalPrice của đơn hàng
	    for (var i = 0; i < productResult.length; i++) {
	     	var orderDetail = new OrderDetail({
	     		orderId: order._id,
	     		productId: productResult[i]._id,
	     		quantity: mapProduct[productResult[i]._id],
	     		unitPrice: productResult[i].price
	     	});

	     	// Thêm từng đối tượng order detail vào mảng.
	     	orderDetailArray.push(orderDetail);

	     	// Tính toán tổng giá đơn hàng.
	     	totalPrice += orderDetail.quantity * orderDetail.unitPrice;	     	
	    };
	    // Set tổng giá cho order.
	    order.totalPrice = totalPrice;
	    
	    // Tiến hành lưu vào database với transaction, đảm bảo tất cả đều thành công.
	    var transaction = new Transaction();
	    // Lưu order
	    transaction.insert('orders', order);
	    // Lưu danh sách order detail.
	    orderDetailArray.forEach(function(orderDetail){
	    	transaction.insert('order_details', orderDetail);
	    });
	    // Kết thúc transaction.
	    transaction.run(function(err, docs){
		    resp.send('OK');
		});    
	});
}
