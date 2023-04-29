const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
	},
	priority: {
		type: Number,
		min: 1,
		max: 3,
		required: true,
	},
});

module.exports = mongoose.model("Goal", GoalSchema);
