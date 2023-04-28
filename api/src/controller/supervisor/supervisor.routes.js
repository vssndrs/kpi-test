const express = require("express");
const router = express.Router();
const supervisorController = require("./supervisor.controller");

router.post("/", (req, res, next) => {
	supervisorController.create(req, res, next);
});

router.get("/:id", (req, res, next) => {
	supervisorController.findOne(req, res, next);
});

router.get("/", (req, res, next) => {
    supervisorController.find(req, res, next);
});

router.put("/:id", (req, res, next) => {
    supervisorController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    supervisorController.delete(req, res, next);
});

module.exports = router;
