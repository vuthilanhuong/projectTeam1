var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var productSchema =  new mongoose.Schema ({
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

productSchema.index({ProductName: 'text'});
productSchema.plugin(mongoosePaginate);

module.exports  = mongoose.model('product',productSchema);