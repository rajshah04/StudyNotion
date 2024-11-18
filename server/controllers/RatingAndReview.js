const RatingAndReview = require('../models/RatingAndReview') ;
const Course = require('../models/Course') ;
const { default: mongoose } = require('mongoose');


// createRating
exports.createRating = async(req, res) => {
    try{

        // get user id
        const userId = req.user.id ;

        // fetch data from req.body
        const {rating, review, courseId} = req.body ;

        // console.log("Rating : ", rating) ;
        // console.log("Review : ", review) ;
        // console.log("Course id : ", courseId) ;

        // check if user is enrolled or not
        const courseDetails = await Course.findById(courseId) ;

        if(!courseDetails.studentsEnrolled.includes(userId)){
            return res.status(404).json({
                success: true,
                message: `The Student cannot review or rate the course, as he/she is not enrolled in the ${courseDetails.courseName} course`
            })
        }

        // check user already reviewed the course or not
        const alreadyReviewed = await RatingAndReview.findOne({user: userId, course: courseId}) ;

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "User cannot rate and review the same course again."
            }) ;
        }

        // create rating and review
        const ratingAndReview = await RatingAndReview.create({
            user: userId,
            rating,
            review,
            course: courseId
        }) ;

        // update course with this rating/review
        const updatedCourseDetails = await Course.findById(courseId) ;

        updatedCourseDetails.ratingAndReviews.push(ratingAndReview._id) ;
        await updatedCourseDetails.save() ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully.",
            ratingAndReview
        }) ;

    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// getAverageRating
exports.getAverageRating = async(req, res) => {
    try{
        // get course id
        const {courseId} = req.body ;

        console.log("Course id : ", courseId) ;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ]) ;

        // return rating
        if(result.length > 0){  
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            }) ;
        }

        // if no rating/review exists
        return res.status(200).json({
            success: true,
            message: "Average ratings is 0, no rating given till now.",
            averageRating: 0
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// getAllRating
exports.getAllRating = async(req, res) => {
    try{
        // get all reviews from the DB
        const allReviews = await RatingAndReview.find({}).sort({rating: "desc"}).populate({
            path: "user",
            select: "firstName lastName email image"
        })
        .populate({
            path: "course",
            select: "courseName"
        })
        .exec() ;

        // return response
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// TODO -- done : getAllRating related to a specific Course
exports.getCourseRelatedRating = async(req, res) => {
    try{
        // get course id
        const {courseId} = req.body ;

        // get all reviews related to the course id from the DB (to be checked)
        const allCourseRelatedReviews = await RatingAndReview.find({course: courseId}) ;

        console.log("Course related ratings : ", allCourseRelatedReviews) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "All reviews related to given course id fetched successfully",
            allCourseRelatedReviews
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}