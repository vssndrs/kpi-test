const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Supervisor = require("../models/supervisor.model");

const refreshDB = [];

exports.login = async (req, res, next) => {
	const SupervisorDB = await Supervisor.find();
	if (!req.body.username || !req.body.password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}

	const supervisor = SupervisorDB.find(
		(supervisor) =>
			supervisor.username === req.body.username &&
			supervisor.password === req.body.password
	);

	if (!supervisor) {
		return res
			.status(401)
			.json({ message: "Username or password is incorrect" });
	}

	const accessToken = jwt.sign(
		{
			username: supervisor.username,
			password: supervisor.password,
			supervisorId: supervisor._id,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
	);

	const refreshToken = jwt.sign(
		{
			username: supervisor.username,
			password: supervisor.password,
			supervisorId: supervisor._id,
		},
		process.env.REFRESH_TOKEN_SECRET
	);

	refreshDB.push(refreshToken);

	res.status(200).json({
		accessToken,
		refreshToken,
		supervisor: {
			_id: supervisor._id,
			username: supervisor.username,
		}
	});
};

exports.refresh = (req, res, next) => {
	const {refreshToken} = req.body;

	if (!refreshToken) {
		return res.status(401).json({ message: "Refresh token is required" });
	}

	if (!refreshDB.includes(refreshToken)) {
		return res.status(403).json({ message: "Refresh token is invalid" });
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res
				.status(403)
				.json({ message: "Refresh token is invalid" });
		}

		const accessToken = jwt.sign(
			{
				username: user.username,
				password: user.password,
				supervisorId: user.supervisorId,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
		);

		res.status(200).json({ accessToken });
	});
};

exports.logout = (req, res, next) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ message: "Refresh token is required" });
	}

	const index = refreshDB.indexOf(refreshToken);
	refreshDB.splice(index, 1);

	res.status(200).json({ message: "Logout successful" });
};

exports.me = (req, res, next) => {
	const authorizationHeader = req.headers.authorization;
	const accessToken = authorizationHeader.split(" ")[1];

	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		(err, supervisor) => {
			if (!err) {
				return res
					.status(200)
					.json({
						supervisor
					});
			}
		}
	);
};
