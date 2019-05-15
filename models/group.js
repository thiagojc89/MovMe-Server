const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	name: {
		type:String,
		required:true
	},
	userId: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'}],
	discussionId: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Discussion'
		}]
})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

