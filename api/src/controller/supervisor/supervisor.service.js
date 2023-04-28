const Supervisor = require("../../models/supervisor.model");

exports.create = (supervisor) => {
	const newSupervisor = new Supervisor(supervisor);
	return newSupervisor.save();
};

exports.findOne = (id) => Supervisor.findById(id).populate({ path: "employees", select: "name" });

exports.find = (query) => Supervisor.find(query).populate({ path: "employees", select: "name" });

exports.update = (id, updateData) =>
	Supervisor.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Supervisor.findByIdAndRemove(id);
