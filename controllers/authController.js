const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')


router.get('/login', async (req,res)=>{
	try{
		const foundUser = await User.findOne({username:req.body.username});
		
		if (foundUser){
			console.log(foundUser);
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

router.post('/register', async (req,res)=>{
	try{

		const newUser = req.body;

		// this line hash the password in req.body.password and assign to newUser.password
		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))


		const createUser = await User.create(newUser);
		res.send(createUser)
	}
	catch{

	}
});

module.exports = router