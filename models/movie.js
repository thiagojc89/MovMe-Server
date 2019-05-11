const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	movieId:Number,
	review:String,
	group:String,
	rate:String
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

