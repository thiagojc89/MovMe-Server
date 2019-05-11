const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')


router.get('/login', async (req,res)=>{
	try{
		const foundUser = await User.findOne({username:req.body.username});
		
		if (foundUser){
			// campare the password pass into the req.body.password match with the hash password
			if(bcrypt.compareSync(req.body.password, foundUser.password)){

				res.send(foundUser)
			}
			else{
				res.send('NOPE NOPE')
			}
		}
	}
	catch{
	}
});

router.post('/register', async (req,res, next)=>{
	try{

		const newUser = req.body;

		// this line hash the password in req.body.password and assign to newUser.password
		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))


		const createUser = await User.create(newUser);
		res.send(createUser)
	}
	catch{
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

				res.send(removedUser)
			}
			else{
				console.log('not the same password');
				res.send('NOPE NOPE Delete Router')
			}
		}
	}
	catch{
		console.log('oppps something wrong');
		next(err)
	}	
});

module.exports = router