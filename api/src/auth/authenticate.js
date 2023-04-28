const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		return res
			.status(401)
			.json({ message: "Authorization header is required" });
	}

	const accessToken = authorizationHeader.split(" ")[1];

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
		if (err) {
			return res.status(403).json({ message: "Invalid access token" });
		}

		req.user = payload;
		next();
	});
};
