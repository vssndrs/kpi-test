const reviewService = require("./review.service");
const employeeService = require("../employee/employee.service");
const logger = require("../../config/logger");

exports.create = async (req, res, next) => {
    const newReview = {
        employee: req.body.employee,
        timeSpan: req.body.timeSpan,
        goals: req.body.goals,
        finalRating: req.body.finalRating,
    };

    try {
        const savedReview = await reviewService.create(newReview);

        const employee = await employeeService.findOne(savedReview.employee);

        employee.reviews.push(savedReview._id);

        await employeeService.update(employee._id, employee);

        logger.info(`POST /review - ${JSON.stringify(savedReview)}`);
        res.status(201).json(savedReview);
    } catch (err) {
        logger.error(err);
        return next(res.status(500).json({ message: "Error adding review" }));
    }
};

exports.findOne = async (req, res, next) => {
    const id = req.params.id;

    try {
        const review = await reviewService.findOne(id);
        if (!review) {
            return next(res.status(404).json({ message: "Review not found" }));
        }
        logger.info(`GET /review/${id} - ${JSON.stringify(review)}`);
        res.status(200).json(review);
    } catch (err) {
        logger.error(err);
        return next(
            res.status(500).json({ message: "Error retrieving review" })
        );
    }
};

exports.find = async (req, res, next) => {
    const query = req.query;

    try {
        const reviews = await reviewService.find(query);
        res.status(200).json(reviews);
    } catch (err) {
        logger.error(err);
        return next(
            res.status(500).json({ message: "Error retrieving reviews" })
        );
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateData = {
        employee: req.body.employee,
        timeSpan: req.body.timeSpan,
        goals: req.body.goals,
        finalRating: req.body.finalRating,
    };

    try {
        const updatedReview = await reviewService.update(id, updateData);
        logger.info(`PUT /review/${id} - ${JSON.stringify(updatedReview)}`);
        res.status(200).json(updatedReview);
    } catch (err) {
        logger.error(err);
        return next(
            res.status(500).json({ message: "Error updating review" })
        );
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        const deletedReview = await reviewService.delete(id);
        if (!deletedReview) {
            return next(res.status(404).json({ message: "Review not found" }));
        }
        logger.info(`DELETE /review/${id}`);
        res.status(200).json({});
    } catch (err) {
        logger.error(err);
        return next(
            res.status(500).json({ message: "Error deleting review" })
        );
    }
};