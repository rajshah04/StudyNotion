const mongoose = require("mongoose") ;

const rarSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
}) ;

module.exports = mongoose.model("RatingAndReview", rarSchema) ;