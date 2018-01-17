var mongoose = require('mongoose');

module.exports  = mongoose.model('product', {   
	ProductName:{
		type: String,
		require: true,
		unique: true,
		index: true
	},
	Price:{
		type: Number,
		require: true
	},
	Size:{
		type: String,
		require: true
	},
	Availability:{
		type: String,
		require: true
	},
	Color:{
		type: String,
		require: true
	},
	Discribe:{
		type: String,
		require: true
	},
	Brand:{
		type: String,
		require: true
	},
	ProductType:{
		type: String,
		require: true
	},
	Picture1:{
		type: String,
		require: true
	},
	Picture2:{
		type: String,
		require: true
	},
	CreatAt:{
		type: Date,
		default: Date.now
	},
	EditAt:{
		type: Date,
		default: Date.now
	},
	status:{
		type :Number,
		default: 1
	}
});