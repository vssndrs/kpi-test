const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");

router.post("/", (req, res, next) => {
    employeeController.create(req, res, next);
});

router.get("/:id", (req, res, next) => {
    employeeController.findOne(req, res, next);
});

router.get("/", (req, res, next) => {
    employeeController.find(req, res, next);
});

router.put("/:id", (req, res, next) => {
    employeeController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    employeeController.delete(req, res, next);
});

module.exports = router;