const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./config/logger");
const { join } = require("path");
const angularAppPath = join(__dirname, "public", "angular");
const authenticate = require("./auth/authenticate");
const authHandler = require("./auth/authHandler");

const app = express();
const apiWrapper = express();
apiWrapper.use("/api", app);

app.use(
	morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/login", authHandler.login);
app.post("/refresh", authHandler.refresh);
app.post("/logout", authHandler.logout);
app.get("/me", authenticate, authHandler.me);

app.use("/supervisor", authenticate, require("./controller/supervisor/supervisor.routes"));
app.use("/employee", authenticate, require("./controller/employee/employee.routes"));
app.use("/review", authenticate, require("./controller/review/review.routes"));

apiWrapper.use("/", express.static(angularAppPath));
apiWrapper.get("*", (req, res) => {
	res.sendFile(join(angularAppPath, "index.html"));
});

app.use((err, req, res, next) => {
	logger.error(`ERROR ${err.statusCode}: ${err.message}`);
	res.status(err.statusCode);
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = apiWrapper;
