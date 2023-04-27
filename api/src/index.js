require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./server");
const logger = require("./config/logger");

const port = process.env.PORT;

mongoose
	.connect(process.env.DB_host)
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((err) => {
		logger.error(`ERROR: ${err}`);
		process.exit();
	});

app.listen(port, () => {
	logger.info(`Server listening on port ${port}`);
});
