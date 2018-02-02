var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var order_detailSchema =  new mongoose.Schema ({
    productId:{
		type: String,
		require: true
	},
	productName:{
		type: String,
		require: true
	},
	orderId:{
		type: String,
		require: true
	},
	quantity:{
		type: Number,
		require: true
	},
	unitPrice:{
		type: Number,
		require: true
	},
	CreatAt:{
		type: Date,
		default: Date.now
	},
	UpdateAt:{
		type: Date,
		default: Date.now
	},
	status:{
		type :Number,
		default: 3
	}
  });

order_detailSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('order_details',order_detailSchema);