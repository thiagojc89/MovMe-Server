const express = require('express');
const router = express.Router();
const Movie = require('../models/movie')


router.get('/', async (req,res,next)=>{
	try{
		const allMovies = await Movie.find()
		res.send(allMovies)
	}
	catch{
		next(err)
	}
});

router.get('/:id', async (req,res,next)=>{
	try{
		const foundMovie = await Movie.findById(req.params.id);
		res.send(foundMovie)
	}
	catch{
		next(err)
	}
});

router.post('/new', async (req,res, next)=>{
	try{
		const newMovie = await Movie.create(req.body)	
		res.send(newMovie);


	}
	catch{
		next(err)
	}
});

module.exports = router