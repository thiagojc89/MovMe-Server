const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
	movie: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MovieCatalog'
	}],
	group:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
	status: {
		type: String, 
		default: 'OPEN'},
	discussionData: {
		type: Array, 
		default: []
	}
})

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;

