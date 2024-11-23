const User = require("../models/User") ;
const Category = require("../models/Category") ;
const { uploadImageToCloudinary } = require("../utils/imageUploader") ;
const Course = require("../models/Course") ;
const Section = require("../models/Section") ;
const SubSection = require("../models/SubSection") ;
const { convertSecondsToDuration } = require("../utils/secondsToDuration") ;
const CourseProgress = require("../models/CourseProgress") ;

// handler function to create course
exports.createCourse = async(req, res) => {
    try{

        // fetch data
        // fetch status also
        let {courseName, courseDescription, whatYouWillLearn, price, category, status, instructions, tag} = req.body ;

        console.log("BEFORE PARSING INSTRUCTIONS : ", instructions) ;
        instructions = JSON.parse(instructions) ;
        console.log("AFTER PARSING")
        console.log("INSTRUCTIONS : ", instructions) ;
        console.log("TAGS : ", tag) ;

        console.log("FILES ->", req.files) ;
        // get thumbnail
        const thumbnail = req.files.thumbnail ;

        // validation
        // add status to necessary places in this file/function
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !instructions || !tag){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        if(!status || status === undefined)
            status = "Draft" ;

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
        const courseThumbnail = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME) ;
        console.log(courseThumbnail) ;

        // create an entry for new course
        const newCourse = await Course.create({courseName, 
            courseDescription, 
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            thumbnail: courseThumbnail.secure_url,
            category: categoryDetails._id,
            status,
            instructions
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

// handler function to edit course
exports.editCourse = async(req, res) => {
    try{
        console.log("req.body : ", req.body) ;
        // fetch the data
        // const { courseId } = req.body ;
        const {courseId, ...updatedInformation} = req.body ;

        console.log("Updated Info : ", updatedInformation) ;

        const course = await Course.findById(courseId) ;

        // validate the data
        if(!course){
            return res.status(404).json({
                success: false,
                message: `Course Not Found with course id : ${courseId}`
            }) ;
        }

        // check whether tumbnail is updated or not
        if(req.files){
            const thumbnail = req.files.thumbnail ;

            const uploadThumbnail = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME) ;

            course.thumbnail = uploadThumbnail.secure_url ;
        }

        // how to update all the remaining information using a for loop ??
        for(const item in updatedInformation){
            if(updatedInformation.hasOwnProperty(item)){
                console.log("Properties of course : ", item, updatedInformation[item]) ;
                if(item === "tag" || item === "instructions"){
                    course[item] = JSON.parse(updatedInformation[item]) ;
                }
                else
                    course[item] = updatedInformation[item] ;
                console.log("Updated properties of course : ", item, " : ", course[item]) ;
            }
        }

        course.save() ;

        // fetch the updated course
        const updatedCourse = await Course.findById(courseId).populate({
                                                                path: "instructor",
                                                                populate: {
                                                                    path: "additionalDetails"
                                                                }  
                                                            })
                                                            .populate("category")
                                                            .populate("ratingAndReviews")
                                                            .populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "subSection"
                                                                }
                                                            })
                                                            .exec() ;

        console.log("Updated Course : ", updatedCourse) ;

        // return the updated course details
        return res.status(200).json({
            success: true,
            message: "Course updated/edited Successfully",
            updatedCourse
        }) ;
    }
    catch(err){
        console.log("Error occured while editing the course ", err.message) ;
        return res.status(400).json({
            success: false,
            message: "Error occurred while editing course",
            error: err.message 
        }) ;
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

        const course = await Course.findById(courseId) ;

        // validate data
        if(!course){
            return res.status(404).json({
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
                                        .populate({
                                            path: "ratingAndReviews",
                                            populate: {
                                                path: "user",
                                                select: "firstName lastName email image"
                                            }
                                        })
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

        // validation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find the course with course id : ${courseId}`
            }) ;
        }

        // count total duration of the course
        
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

// handler function to get full course details
exports.getFullCourseDetails = async(req, res) => {
    try{
        const { courseId } = req.body ;
        const userId = req.user.id ;
        const courseDetails = await Course.findById(courseId).populate({
                                                                path: "instructor",
                                                                populate: {
                                                                path: "additionalDetails",
                                                                },
                                                            })
                                                            .populate("category")
                                                            .populate({
                                                                path: "ratingAndReviews",
                                                                populate: {
                                                                    path: "user",
                                                                    select: "firstName lastName email image"
                                                                }
                                                            })
                                                            .populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                path: "subSection",
                                                                },
                                                            })
                                                            .exec() ;

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`
            }) ;
        }

        // a lot more to add like total duration of the course, course progress -- TODO -- done
        
        let totalDurationInSeconds = 0 ;

        courseDetails.courseContent.forEach((section) => {
            section.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds) ;

        const courseProgressCount = await CourseProgress.findOne({courseID: courseId, userId: userId}) ;
      
        console.log("courseProgressCount : ", courseProgressCount) ;

        return res.status(200).json({
            success: true,
            message: "Full Course details fetched Successfully",
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : []
            },
        }) ;
    }
    catch(err){
        console.log("Error occured while fetching the course details : ", err.message) ;
        return res.status.json({
            success: false,
            message: "Some error occured in fetching the course details.",
            error: err.message
        }) ;
    }
}


// handler funciton to get Instructor courses
exports.getInstructorCourses = async(req, res) => {
    try{

        // fetch the instructor's id
        const instructorId = req.user.id ;
        console.log("Instructor id : ", instructorId) ;

        // fetch the first name and the last name of the instructor
        const instructor = await User.findById(instructorId) ;
        console.log("Instructor : ", instructor) ;

        const firstName = instructor?.firstName ;
        const lastName = instructor?.lastName ;
        
        // find the courses of the instructor
        const instructorCourses = await Course.find({instructor: instructorId}).sort({ createdAt: -1 }) ;

        // return the courses
        return res.status(200).json({
            success: true,
            message: `Instructor ${firstName} ${lastName}'s all courses fetched Successfully`,
            instructorCourses
        }) ;
    }
    catch(err){
        console.log(err) ;
        return res.status(400).json({
            success: false,
            message: `Some error occured in fetching the Instructor ${firstName} ${lastName}'s courses`,
            error: err.message
        }) ;
    }
}

// handler function to delete a course -- TODO
exports.deleteCourse = async(req, res) => {
    try{
        // fetch the course id
        const {courseId} = req.body ;
        console.log("Course id to be deleted : ", courseId) ;

        // fetch the course details
        const course = await Course.findById(courseId) ;

        if(!course){
            console.log("Course not found") ;
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            }) ;
        }

        // delete every subsection of every section of the course
        for(let sectionId of course.courseContent){
            const section = await Section.findById(sectionId) ;

            if(section){
                console.log(section.subSection) ;
                for(let subsectionId of section.subSection){
                    const subSection = await SubSection.findByIdAndDelete(subsectionId) ;
    
                    console.log("Deleted Subsection : ", subSection) ;
                }
            }

            const deletedSection = await Section.findByIdAndDelete(section) ;

            console.log("Deleted Section : ", deletedSection) ;
        }


        // need to delete the rating and review of the course ??

        // remove the course from its category
        const category = await Category.findByIdAndUpdate(course.category,
            {
                $pull:{
                    course: courseId
                }
            },
            {
                new: true
            }
        ) ;

        console.log("Category after removing course id : ", category) ;

        

        // unenrol all the students enrolled in the course

        // TRY - notify the student about their unenrollment from the given course - either through an email or a notification (toaster)

        // delete the course
        await Course.findByIdAndDelete(courseId) ;

        return res.status(200).json({
            success: true,
            message: "Course deleted Successfully"
        }) ;
    }
    catch(err){
        console.log("Error occured while deleting a course : ", err.message) ;
        return res.status(400).json({
            success: false,
            message: "Some error occured while deleting a course",
            error: err.message
        }) ;
    }
}