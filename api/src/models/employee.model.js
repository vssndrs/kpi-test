const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	supervisor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Supervisor",
	},
	registrationNumber: {
		type: Number,
		required: true,
	},
	jobTitle: {
		type: String,
		required: true,
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review",
		},
	],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
