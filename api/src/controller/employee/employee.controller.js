const employeeService = require("./employee.service");
const logger = require("../../config/logger");

const supervisorService = require("../supervisor/supervisor.service");

exports.create = async (req, res, next) => {
	const newEmployee = {
		name: req.body.name,
		supervisor: req.body.supervisor,
		registrationNumber: req.body.registrationNumber,
		jobTitle: req.body.jobTitle,
	};

	try {
		const savedEmployee = await employeeService.create(newEmployee);

		const supervisor = await supervisorService.findOne(
			savedEmployee.supervisor
		);

		supervisor.employees.push(savedEmployee._id);

		console.log(supervisor);

		await supervisorService.update(supervisor._id, supervisor);

		logger.info(`POST /employee - ${JSON.stringify(savedEmployee)}`);
		res.status(201).json(savedEmployee);
	} catch (err) {
		logger.error(err);
		return next(res.status(500).json({ message: "Error adding employee" }));
	}
};

exports.findOne = async (req, res, next) => {
	const id = req.params.id;

	try {
		const employee = await employeeService.findOne(id);
		if (!employee) {
			return next(
				res.status(404).json({ message: "Employee not found" })
			);
		}
		logger.info(`GET /employee/${id} - ${JSON.stringify(employee)}`);
		res.status(200).json(employee);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error retrieving employee" })
		);
	}
};

exports.find = async (req, res, next) => {
	const query = req.query;

	try {
		const employees = await employeeService.find(query);
		res.status(200).json(employees);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error retrieving employees" })
		);
	}
};

exports.update = async (req, res, next) => {
	const id = req.params.id;
	const updateData = {
		name: req.body.name,
		supervisor: req.body.supervisor,
		registrationNumber: req.body.registrationNumber,
		jobtitle: req.body.jobtitle,
	};

	try {
		const updatedEmployee = await employeeService.update(id, updateData);
		if (!updatedEmployee) {
			return next(
				res.status(404).json({ message: "Employee not found" })
			);
		}
		logger.info(
			`PATCH /employee/${id} - ${JSON.stringify(updatedEmployee)}`
		);
		res.status(200).json(updatedEmployee);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error updating employee" })
		);
	}
};

exports.delete = async (req, res, next) => {
	const id = req.params.id;

	try {
		const deletedEmployee = await employeeService.delete(id);
		if (!deletedEmployee) {
			return next(
				res.status(404).json({ message: "Employee not found" })
			);
		}
		logger.info(
			`DELETE /employee/${id} - ${JSON.stringify(deletedEmployee)}`
		);
		res.status(200).json(deletedEmployee);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error deleting employee" })
		);
	}
};
