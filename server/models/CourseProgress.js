const mongoose = require("mongoose") ;

const courseProgressSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        completedVideos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection"
            }
        ],
    },
    // add timestamps for when the document is created and last modified
    {timestamps: true}
);

module.exports = mongoose.model("CourseProgress", courseProgressSchema) ;