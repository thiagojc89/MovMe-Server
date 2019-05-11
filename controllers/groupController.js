const express = require('express');
const router = express.Router();
const Group = require('../models/group')


router.post('/new', async (req,res, next)=>{
	try{
		const newGroup = await Group.create(req.body)	
		res.send(newGroup);


	}
	catch{
		next(err)
	}
});


module.exports = router;