const logger = require("../config/logger");
const fsp = require("fs").promises;
const path = require("path");
const Supervisor = require("../models/supervisor.model");
const Employee = require("../models/employee.model");
const Review = require("../models/review.model");

const seedCollection = async (model, fileName) => {
	try {
		const data = await fsp.readFile(path.join(__dirname, `${fileName}.json`));
		const parsedData = JSON.parse(data);
		await model.deleteMany({});
		await model.insertMany(parsedData);
		logger.info(`Seeded ${fileName} collection`);
	} catch (err) {
		logger.error(err);
	}
};

exports.seeder = async () => {
	logger.info("Seeding data...");
	seedCollection(Supervisor, 'supervisors');
	seedCollection(Employee, 'employees');
	seedCollection(Review, 'reviews');
};
