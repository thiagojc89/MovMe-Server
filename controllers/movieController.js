const express = require('express');
const router = express.Router();
const Movie = require('../models/movie')


router.get('/', async (req,res,next)=>{
	try{
		const allMovies = await Movie.find()
		res.json({
        	status: 200,
        	data: allMovies
      	});
	}
	catch(err){
		next(err)
	}
});

router.get('/:id', async (req,res,next)=>{
	try{
		const foundMovie = await Movie.findById(req.params.id);
		res.json({
        	status: 200,
        	data: foundMovie
      	});
	}
	catch(err){
		next(err)
	}
});

router.post('/new', async (req,res, next)=>{
	try{
		const newMovie = await Movie.create(req.body)	
		res.json({
        	status: 200,
        	data: newMovie
      	});
	}
	catch(err){
		next(err)
	}
});

module.exports = router