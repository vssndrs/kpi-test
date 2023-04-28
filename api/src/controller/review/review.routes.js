const express = require("express");
const router = express.Router();
const reviewController = require("./review.controller");

router.post("/", (req, res, next) => {
    reviewController.create(req, res, next);
});

router.get("/:id", (req, res, next) => {
    reviewController.findOne(req, res, next);
});

router.get("/", (req, res, next) => {
    reviewController.find(req, res, next);
});

router.put("/:id", (req, res, next) => {
    reviewController.update(req, res, next);
});

router.delete("/:id", (req, res, next) => {
    reviewController.delete(req, res, next);
});

module.exports = router;