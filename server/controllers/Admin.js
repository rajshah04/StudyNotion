const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");

// write controller to fetch the instructors details
exports.getAllInstructorsDetails = async(req, res) => {
    try{
        // validate
        let instructorsDetails = await User.find({accountType : "Instructor"}).populate({
                                                                                    path: "courses",
                                                                                    populate: {
                                                                                        path: "ratingAndReviews",
                                                                                    },
                                                                                })
                                                                            .exec() ;

        // send response
        return res.status(200).json({
            success: true,
            message: "Successfully fetched details of all the instructors",
            instructorsDetails
        }) ;
    }
    catch(err){
        console.log("Error occured in fetching details of all Instructors.", err) ;
        return res.status(500).json({
            success: false,
            message: "Cannot fetch details of all Instructors.",
            error: err.message
        }) ;
    }
}

// controller to fetch the courses by the admin
exports.getCourses = async(req, res) => {
    try{
        const { courseType } = req.body ;

        let courses ;

        if(courseType === "All"){
            courses = await Course.find({}).populate("instructor").exec() ;
        }
        else if(courseType === "Published"){
            courses = await Course.find({status: "Published"}).populate("instructor").exec() ;
        }
        else if(courseType === "Drafted"){
            courses = await Course.find({status: "Draft"}).populate("instructor").exec() ;
        }

        return res.status(202).json({
            success: true,
            message: `${courseType} courses fetched Successfully`,
            courses
        }) ;
    }
    catch(err){
        console.log("Error occured in fetching all courses : ", err) ;
        return res.status(500).json({
            success: false,
            message: "Cannot fetch courses for the Admin.",
            error: err.message
        }) ;
    }
}

// controller to fetch the course details along with the student progress
exports.getCourseDetails = async(req, res) => {
    try{
        const { courseId } = req.body ;

        let course = await Course.findById(courseId).populate("instructor")
                                                    .populate("ratingAndReviews")
                                                    .populate("courseContent")
                                                    .populate("studentsEnrolled").exec() ;

        course = course.toObject() ;

        let totalSubSections = 0 ;
        for(let section of course?.courseContent){
            totalSubSections += section.subSection.length ;
        }

        for(let i = 0 ; i < course?.studentsEnrolled.length ; i++){
            // console.log("Student : ", student) ;
            const student = course?.studentsEnrolled[i] ;

            const courseProgress = await CourseProgress.findOne({courseId, userId: student._id}) ;

            const totalCompletedVideos = courseProgress?.completedVideos.length || 0 ;

            // make it up to 2 decimal point
            const multiplier = Math.pow(10, 2) ;

            const progressPercentage = Math.round((totalCompletedVideos / totalSubSections) * 100 * multiplier) / multiplier ;

            course.studentsEnrolled[i].progressPercentage = progressPercentage ;
        }

        return res.status(202).json({
            success: true,
            message: `Course's detail fetched Successfully`,
            course
        }) ;
    }
    catch(err){
        console.log("Error occured in fetching all courses : ", err) ;
        return res.status(500).json({
            success: false,
            message: "Cannot fetch Course's details for the Admin.",
            error: err.message
        }) ;
    }
}