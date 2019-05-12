const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	movie: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MovieCatalog'
	}],
	review:String,
	group:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
	rate:{
		type: String,
		required: true} 
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

