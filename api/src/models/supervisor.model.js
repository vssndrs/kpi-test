const mongoose = require("mongoose");

const SupervisorSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	employees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
	],
});

module.exports = mongoose.model("Supervisor", SupervisorSchema);
