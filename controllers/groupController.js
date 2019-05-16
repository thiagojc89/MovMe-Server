const express = require('express');
const router = express.Router();
const Group = require('../models/group')
const User = require('../models/user')
const Discussion = require('../models/discussion')



router.get('/:id', async (req,res, next)=>{
	try{
		console.log('HIT THIS GET ROUTE =================##########');
		// this is my get groups by userId route
		
		const foundUser = await User.findById(req.params.id).populate('group')

		console.log(foundUser,'==================foundUser=========');


		res.json({
        	status: 200,
        	data: foundUser
      	});
	}
	catch(err){
		next(err)
	}
});



router.post('/new', async (req,res, next)=>{
	try{

		//this route will create a new group
		//will include the creator user id inside of the Group.userId Array

		//Will look for the user and includ the group._id inside of the User.groups arrays

		console.log(req.body, '=======req.body to create new group====');
		const newGroup = await Group.create(req.body)


		const foundUser = await User.findOne(req.body.UserId)
		foundUser.group.push(newGroup._id);
		foundUser.save()	

		res.json({
        	status: 200,
        	data: {
        		newGroup: newGroup,
        		foundUser: foundUser
        	}
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