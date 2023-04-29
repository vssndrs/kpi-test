const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
	},
	timeSpan: {
		type: String,
		required: true,
	},
	goals: [
		{
			description: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				enum: [0, 0.2, 0.4, 0.6, 0.8, 1],
			},
			priority: {
				type: Number,
				min: 1,
				max: 3,
				required: true,
			},
		},
	],
	finalRating: {
		type: Number,
	},
});

module.exports = mongoose.model("Review", ReviewSchema);
