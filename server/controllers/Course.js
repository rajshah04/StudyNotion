const User = require("../models/User") ;
const Category = require("../models/Category") ;
const uplaodImageToCloudinary = require("../utils/imageUploader") ;
const Course = require("../models/Course") ;

// handler function to create course
exports.createCourse = async(req, res) => {
    try{

        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body ;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage ;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        // check for Instructor
        const userId = req.user.id ;
        const instructorDetails = await User.findById(userId) ;

        console.log("Instructor Details: ", instructorDetails) ;

        if(!instructorDetails){
            return res.status(404).json({
                success: true,
                message: "Instructor Details not found"
            }) ;
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category) ;

        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details not found"
            }) ;
        }

        // upload image to cloudinary
        const thumbnailImage = await uplaodImageToCloudinary(thumbnail, process.env.FOLDER_NAME) ;
        console.log(thumbnailImage) ;

        // create an entry for new course
        const newCourse = await Course.create({courseName, 
            courseDescription, 
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
            category: categoryDetails._id
        }) ;

        // add the new course to the User schema of Instructor
        const addCourseToInstructor = await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id
            }, 
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {
                new: true
            }
        ) ;
        console.log("Course added into the Instructor schema : ", addCourseToInstructor) ;

        // update the TAG / CATEGORY ka schema
        // TODO: HW -- done
        // push the course id into Category
        const updatedCategoryDetails = await Category.findByIdAndUpdate(category,
            {
                $push: {
                    course: newCourse._id,
                }
            },
            {
                new: true
            }
        ) ;
        console.log("Course added into the category : ", updatedCategoryDetails) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Course created Successfully",
            data: newCourse
        }) ;
    }
    catch(err){
        console.error(err) ;
        return res.status().json({
            success: false,
            message: "Failed to create Course",
            error: err.message
        })
    }
}

// handler function to getAllCourses
exports.getAllCourses = async(req, res) => {
    try{

        // TODO: change the below statement incrementally
        const allCourses = await Course.find({}) ;

        // const allCourses = await Course.find({}, {courseName: true,
        //                                           instructor: true,
        //                                           price: true,
        //                                           thumbnail: true,
        //                                           ratingAndReviews: true,
        //                                           studentsEnrolled: true
        //                                     }).populate("instructor").exec() ;

        return res.status(200).json({
            success: true,
            message: "Data for all Courses fetched Successfully",
            data: allCourses
        }) ;
    }
    catch(err){
        console.log(err) ;
        return res.status(500).json({
            success : false,
            message: "Cannot fetch Course data",
            error: err.message
        }) ;
    }
}

// handler function to get Course details
exports.getCourseDetails = async(req, res) => {
    try{
        // fetch data - courseId
        const {courseId} = req.body ;

        // validate data
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            }) ;
        }

        // fetch course details
        const courseDetails = await Course.findById(courseId)
                                        .populate(
                                            {
                                                path: "instructor",
                                                populate: {
                                                    path: "additionalDetails"
                                                },
                                            }
                                        )
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate(
                                            {
                                                path: "courseContent",
                                                populate: {
                                                    path: "subSection"
                                                },
                                            }
                                        )
                                        // .populate(
                                        //     {
                                        //         path: "studentsEnrolled",
                                        //         populate: {
                                        //             path: "additionalDetails"
                                        //         },
                                        //     }
                                        // )
                                        .exec() ;

        // // validation
        // if(!courseDetails){
        //     return res.status(400).json({
        //         success: false,
        //         message: `Could not find the course with ${courseId}`
        //     }) ;
        // }
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            courseDetails
        }) ;
    }catch(err){
        return res.status.json({
            success: false,
            message: "Some error occured in fetching the course details.",
            error: err.message
        }) ;
    }
}