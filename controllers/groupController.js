const express = require('express');
const router = express.Router();
const Group = require('../models/group')
const Discussion = require('../models/discussion')


router.post('/new', async (req,res, next)=>{
	try{
		const newGroup = await Group.create(req.body)	
		res.json({
        	status: 200,
        	data: newGroup
      	});
	}
	catch(err){
		next(err)
	}
});

router.put('/:groupId/:userId', async (req,res, next)=>{
	try{
		const foundGroup = await Group.findById(req.params.groupId);
		foundGroup.userId.push(req.params.userId);
		foundGroup.save()	
		res.json({
        	status: 200,
        	data: foundGroup
      	});
	}
	catch(err){
		res.send(err)
	}
});
router.post('/adddiscussion', async (req,res, next)=>{
	try{

		const newDiscussion = await Discussion.create(req.body)

		res.json({
        	status: 200,
        	data: newDiscussion
      	});
	}
	catch(err){
		next(err)
	}
});
router.put('/addmovie', async (req,res, next)=>{
	try{

		const foundGroup = await Group.findById(req.body.groupId);
		
		foundGroup.discussion.push(req.body.discussionId);
		foundGroup.save()	
		res.json({
        	status: 200,
        	data: foundGroup
      	});
	}
	catch(err){
		next(err)
	}
});
router.put('/addtexttodiscussion', async (req,res, next)=>{
	try{

		const foundDiscussion = await Discussion.findById(req.body.discussionId);
		
		foundDiscussion.discussionData.push(req.body.discussionData);
		foundDiscussion.save()	
		res.json({
        	status: 200,
        	data: foundDiscussion
      	});
	}
	catch(err){
		next(err)
	}
});

router.put('/close', async (req,res, next)=>{
	try{

		console.log('discussion close');

		const foundDiscussion = await Discussion.findById(req.body.discussionId);
		
		foundDiscussion.status='CLOSED'
		foundDiscussion.save()	
		res.json({
        	status: 200,
        	data: foundDiscussion
      	});
	}
	catch(err){
		next(err)
	}
});
module.exports = router;