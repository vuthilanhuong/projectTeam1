var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ordersSchema =  new mongoose.Schema ({
    shipName:{
		type: String
	},
	customerId:{
		type: String,
		require: true
	},
	totalPrice:{
		type: Number,
		require: true
	},
	phone:{
		type: String
	},
	address:{
		type: String
	},
	timeShip:{
		type: Date
	},
	note:{
		type: String
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
ordersSchema.plugin(mongoosePaginate);
module.exports  = mongoose.model('orders',ordersSchema);