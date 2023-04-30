const Employee = require("../../models/employee.model");

exports.create = (employee) => {
	const newEmployee = new Employee(employee);
	return newEmployee.save();
};

exports.findOne = (id) =>
	Employee.findById(id)
		.populate({ path: "supervisor", select: "username" })
		.populate({ path: "reviews", options: { sort: { timeSpan: 1 } } });

exports.find = (query) =>
	Employee.find(query)
		.populate({ path: "supervisor", select: "username" })
		.populate({ path: "reviews", options: { sort: { timeSpan: 1 } } })
		.sort({ name: 1 });

exports.update = (id, updateData) =>
	Employee.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Employee.findByIdAndRemove(id);
