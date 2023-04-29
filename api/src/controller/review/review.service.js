const Review = require("../../models/review.model");

exports.create = (review) => {
    const newReview = new Review(review);
    return newReview.save();
};

exports.findOne = (id) => Review.findById(id).populate({ path: "employee", select: "name"});

exports.find = (query) => Review.find(query).populate({ path: "employee", select: "name"});

exports.update = (id, updateData) => Review.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Review.findByIdAndRemove(id);