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
				enum: [1, 2, 3],
				required: true,
			},
		},

	],
	finalRating: {
		type: Number,
	},
});

ReviewSchema.path("goals").validate(function (goals) {
	if (goals.length < 3) {
		throw new Error("Legalább 3 cél megadása szükséges!");
	} else if (goals.length > 10) {
		throw new Error("Legfeljebb 10 cél adható meg!");
	} else {
		let priority1 = 0;
		let priority2 = 0;
		let priority3 = 0;
		for (let i = 0; i < goals.length; i++) {
			if (!goals[i].description) {
				throw new Error("Mindegyik célhoz meg kell adni a leírást!");
			} else if (!goals[i].priority) {
				throw new Error("Mindegyik célhoz meg kell adni a prioritást!");
			} else if (goals[i].priority === 1) {
				priority1++;
			} else if (goals[i].priority === 2) {
				priority2++;
			} else if (goals[i].priority === 3) {
				priority3++;
			}
		}
		if (priority3 > goals.length * 0.25) {
			throw new Error(
				"A magas prioritású célok száma nem haladhatja meg az összes cél 25%-át!"
			);
		} else if (priority2 > goals.length * 0.3) {
			throw new Error(
				"A közepes prioritású célok száma nem haladhatja meg az összes cél 30%-át!"
			);
		}
	}
});

module.exports = mongoose.model("Review", ReviewSchema);
