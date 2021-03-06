const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')



// I'm setting this route with POST instead of GET for a way to solve this erro msg
// ERROR: Request with GET/HEAD method cannot have body.
 
router.post('/login', async (req,res, next)=>{
	try{

		const foundUser = await User.findOne({email:req.body.email});
		if (foundUser){
			// campare the password pass into the req.body.password match with the hash password
			if(bcrypt.compareSync(req.body.password, foundUser.password)){

				req.session.logged = true;
	    		req.session.userDbId = foundUser._id
	    		req.session.username = foundUser.firstName

				res.json({
		        	status: 200,
		        	data: foundUser
		      	});
			}
			else{
				res.json({
		        	status: 300,
		        	data: 'login invalido'
		      	});
			}
		}
		else{
			res.json({
		        status: 300,
		        data: 'invalid login'
		    });
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

		req.session.logged = true;
		req.session.userDbId = createUser._id
		req.session.username = createUser.firstName

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
	
		const userToBeRemoved = await User.findById(req.params.id);
		
		if (userToBeRemoved){
	
			// campare the password pass into the req.body.password match with the hash password
			if(bcrypt.compareSync(req.body.password, userToBeRemoved.password)){
				
				const removedUser = await User.findByIdAndRemove(userToBeRemoved._id)

				res.json({
		        	status: 200,
		        	data: removedUser
		      	});
			}
			else{
				res.json({
		        	status: 300,
		        	data: 'not the same password'
		      	});
			}
		}
		else{
			res.json({
		        status: 300,
		        data: 'user not found'
		    });
		}
	}
	catch(err){
		next(err)
	}	
});

router.put('/:id', async (req,res,next)=>{
	try{
		
		const userToBeEdit = await User.findById(req.params.id);
		
		if (userToBeEdit){
	
			const userNewInfo = {}
			userNewInfo.firstName = req.body.firstName
			userNewInfo.lastName = req.body.lastName
			userNewInfo.email = req.body.email

			// campare the password pass into the req.body.password match with the hash password
			if(bcrypt.compareSync(req.body.password, userToBeEdit.password)){
				
				const updatedUser = await User.findByIdAndUpdate(userToBeEdit._id , userNewInfo)
	
				res.json({
		        	status: 200,
		        	data: updatedUser
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