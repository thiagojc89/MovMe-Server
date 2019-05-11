const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
	userId:Number,
	movieID:String,
	discussion:String
	//movieId
	//Text-discussion
})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

