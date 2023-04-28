const supervisorService = require("./supervisor.service");
const logger = require("../../config/logger");

exports.create = async (req, res, next) => {
	const newSupervisor = {
		username: req.body.username,
        password: req.body.password,
		employees: req.body.employees,
	};

	try {
		const savedSupervisor = await supervisorService.create(newSupervisor);
        logger.info(`POST /supervisor - ${JSON.stringify(savedSupervisor)}`);
		res.status(201).json(savedSupervisor);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error adding supervisor" })
		);
	}
};

exports.findOne = async (req, res, next) => {
	const id = req.params.id;

	try {
		const supervisor = await supervisorService.findOne(id);
		if (!supervisor) {
			return next(
				res.status(404).json({ message: "Supervisor not found" })
			);
		}
        logger.info(`GET /supervisor/${id} - ${JSON.stringify(supervisor)}`);
		res.status(200).json(supervisor);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error retrieving supervisor" })
		);
	}
};

exports.find = async (req, res, next) => {
	const query = req.query;

	try {
		const supervisors = await supervisorService.find(query);
		res.status(200).json(supervisors);
	} catch (err) {
		logger.error(err);
		return next(
			res.status(500).json({ message: "Error retrieving supervisors" })
		);
	}
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateData = {
        username: req.body.username,
        password: req.body.password,
        employees: req.body.employees,
    };

    try {
        const updatedSupervisor = await supervisorService.update(id, updateData);
        if (!updatedSupervisor) {
            return next(
                res.status(404).json({ message: "Supervisor not found" })
            );
        }
        logger.info(`PUT /supervisor/${id} - ${JSON.stringify(updatedSupervisor)}`);
        res.status(200).json(updatedSupervisor);
    } catch (err) {
        logger.error(err);
        return next(
            res.status(500).json({ message: "Error updating supervisor" })
        );
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedSupervisor = await supervisorService.delete(id);
        if (!deletedSupervisor) {
            return next(
                res.status(404).json({ message: "Supervisor not found" })
            );
        }
        logger.info(`DELETE /supervisor/${id} - ${JSON.stringify(deletedSupervisor)}`);
        res.status(200).json(deletedSupervisor);
    } catch (err) {
        logger.error(err);
        return next(
            res.status(500).json({ message: "Error deleting supervisor" })
        );
    }
};