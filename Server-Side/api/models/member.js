var mongoose = require('mongoose');

module.exports  = mongoose.model('member', {   
	fullName: {
		type: String,
		trim: true,
		require: true
	},
	userName:{
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		index: true,
		require: true
	},
	password: {
		type: String,
		trim: true,
		require: true
	},
	email: {
		type: String,
		unique: true,
		index: true,
		lowercase: true,
		trim: true,
		require: true
	},
	gender: {
		type: Number,
		require: true
	},
	birthDay: {
		type: Date,
		require: true
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
	updateAt: {
		type: Date,
		default: Date.now
	},
	avatarUrl: {
		type: String,
	},
	status:{
		type :Number,
		default: 1
	}
});
