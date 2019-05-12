const mongoose = require('mongoose');

const movieCatalogSchema = mongoose.Schema({
	movieId: {
		type: String,
		required: true},
})

const MovieCatalog = mongoose.model('MovieCatalog', movieCatalogSchema);

module.exports = MovieCatalog;