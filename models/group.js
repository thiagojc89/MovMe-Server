const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
	userId: Array,
	discussion: Array
})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

