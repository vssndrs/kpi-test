const Review = require("../../models/review.model");

exports.create = (review) => {
    const newReview = new Review(review);
    return newReview.save();
};

exports.findOne = (id) => Review.findById(id);

exports.find = (query) => Review.find(query);

exports.update = (id, updateData) => Review.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Review.findByIdAndRemove(id);