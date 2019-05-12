const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')


router.get('/login', async (req,res, next)=>{
	try{
		const foundUser = await User.findOne({email:req.body.email});
		
		if (foundUser){
			// campare the password pass into the req.body.password match with the hash password
			if(bcrypt.compareSync(req.body.password, foundUser.password)){

				res.json({
		        	status: 200,
		        	data: foundUser
		      	});
			}
			else{
				res.json({
		        	status: 200,
		        	data: 'wrong password'
		      	});
			}
		}
	}
	catch(err){
		next(err)
	}
});

router.post('/register', async (req,res, next)=>{
	try{

		const newUser = req.body;

		// this line hash the password in req.body.password and assign to newUser.password
		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

		const createUser = await User.create(newUser);
		res.json({
        	status: 200,
        	data: createUser
      	});
	}
	catch(err){
		next(err)
	}
});

router.delete('/:id', async (req,res,next)=>{
	try{
		console.log('hit the delete router');
		console.log('req.params.id', req.params.id);
		const userToBeRemoved = await User.findById(req.params.id);
		
		if (userToBeRemoved){
			console.log('foundUser to be removed');
			// campare the password pass into the req.body.password match with the hash password
			if(bcrypt.compareSync(req.body.password, userToBeRemoved.password)){
				console.log(' same password');
				const removedUser = await User.findByIdAndRemove(userToBeRemoved._id)

				res.json({
		        	status: 200,
		        	data: removedUser
		      	});
			}
			else{
				res.json({
		        	status: 200,
		        	data: 'not the same password'
		      	});
			}
		}
	}
	catch(err){
		next(err)
	}	
});

module.exports = router