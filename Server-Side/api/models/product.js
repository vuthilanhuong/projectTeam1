var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var productSchema =  new mongoose.Schema ({
    ProductName:{ //gioi thieu ngan ve sp
		type: String,
		require: true,
		unique: true,
		index: true
	},
	Price:{
		type: Number,
		require: true
	},
	// quantity:{
	// 	type: Number,
	// 	require: true
	// },
	// Size:{
	// 	type: String,
	// 	require: true
	// },
	Availability:{ //sp con hay khong
		type: String,
		require: true
	},
	AdminAccept:{
    	type: Number,
		require: true,
		default: -1
		//-1: admin chưa duyệt
		//0: admin từ chối
		//1: admin duyệt
	},
	// Color:{
	// 	type: String,
	// 	require: true
	// },
	Discribe:{
		type: String,
		require: true
	},
	Brand:{ // Thiet ke do hoa--- Lap trinh va cong nghe
		type: String,
		require: true
	},
	ProductType:{ //chi tiet cac loai sp cua 2 nhanh tren
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