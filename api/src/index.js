require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./server");
const logger = require("./config/logger");
const Supervisor = require("./models/supervisor.model");
const seeder = require("./seed/seeder");

const port = process.env.PORT;

mongoose
	.connect(process.env.DB_HOST)
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((err) => {
		logger.error(`ERROR: ${err}`);
		process.exit();
	})
	.finally( async () => {
		const supervisorNumber = await Supervisor.countDocuments();
		if (supervisorNumber === 0) {
			seeder.seeder();
		}
	})

app.listen(port, () => {
	logger.info(`Server listening on port ${port}`);
});
