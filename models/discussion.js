const mongoose = require('mongoose');

const discussionSchema = mongoose.Schema({
	movieId: String,
	groupId: String,
	status: {type:String , default:'OPEN'},
	discussionData: {type: Array, default: []}
})

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;

