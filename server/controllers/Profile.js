const Profile = require("../models/Profile") ;
const User = require("../models/User") ;
const Course = require("../models/Course") ;
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secondsToDuration") ;

exports.updateProfile = async(req, res) => {
    try{

        // fetch data
        const {gender, dateOfBirth="", about="", contactNumber} = req.body ;

        // get userid
        const userId = req.user.id ;

        console.log(req.user) ;

        // validate data - no need
        // if(!gender || !contactNumber || !userId){
        if(!gender || !userId){
            return res.status(400).json({
                success: false,
                message: "Gender and User both are required."
            }) ;
        }

        // from the user id, fetch the profile id
        const userDetails = await User.findById(userId) ;
        console.log("User details: ", userDetails) ;

        const profileId = userDetails.additionalDetails ;
        console.log("Profile id of the user: ", profileId) ;

        // update the profile schema
        // different code than Love Babbar
        // const updatedProfile = await Profile.findByIdAndUpdate({profileId},
        //                                                         {
        //                                                             gender: gender,
        //                                                             dateOfBirth,
        //                                                             about,
        //                                                             contactNumber
        //                                                         },
        //                                                         {
        //                                                             new: true
        //                                                         }
        //                                                     ) ;
        // console.log("Updated profile of the user: ", updatedProfile) ;

        // find profile
        const profileDetails = await Profile.findById(profileId) ;

        // update profile - another way
        profileDetails.dateOfBirth = dateOfBirth ;
        profileDetails.about = about ;
        profileDetails.gender = gender ;
        profileDetails.contactNumber = contactNumber ;
        await profileDetails.save() ;


        // return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails
        }) ;

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Some error occured while updating the profile, please try again.",
            error: err.message
        }) ;
    }
}

// TODO -- done : delete account
// Explore -> how can we schedule this deletion operation (cronjob)
exports.deleteAccount = async(req, res) => {
    try{

        // get user id
        let userId = req.user.id ;

        console.log("USER ID : ", userId) ;

        // validation
        const userDetails = await User.findById(userId) ;
        console.log("User details: ", userDetails) ;

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            }) ;
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails}) ;

        // do we also need to delete course progress of the user/student
        // TODO: done -- delete course progress of the user/student
        
        let courseProgress = await CourseProgress.findOneAndDelete({userId: userId}) ;
        
        while(courseProgress != null){
            courseProgress = await CourseProgress.findOneAndDelete({userId: userId}) ;
        }

        const deletedCourseProgress = await CourseProgress.deleteMany({userId: userId}) ;

        console.log("Deleted Course Progress : ", deletedCourseProgress) ;

        // TODO: done -- unenroll user from all enrolled courses 
        if(userDetails.courses.length != 0){
            for(const courseId of userDetails.courses){
                await Course.findByIdAndUpdate(courseId,
                    {
                        $pull : {
                            studentsEnrolled: userId,
                        }
                    },
                    {new: true}
                ) ;
            }
        }

        // delete user
        await User.findByIdAndDelete({_id: userId}) ;
        console.log("user deleted")

        // return response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        }) ;

    }catch(err){
        return res.status(400).json({
            success: false,
            message: "Some error occured in deleting the account, please try again",
            error: err.message
        }) ;
    }
}

exports.getAllUserDetails = async(req, res) => {
    try{

        // get user id
        const userId = req.user.id ;
        // console.log(req.user) ;

        console.log("JWT : ", process.env.JWT_SECRET) ;

        // validate and get user details
        const userDetails = await User.findById(userId).populate("additionalDetails").exec() ;

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            }) ;
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "All User details fetched Successfully"
        }) ;

    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: "Cannot get all the details.",
            error: err.message
        }) ;
    }
}

exports.updateProfilePicture = async(req, res) => {
    try {
        // get the picture
        const image = req.files.profilePicture ;
        const userId = req.user.id ;
        
        console.log(userId) ;
        // upload it on cloudinary
        const uploadResult = await uploadImageToCloudinary(image, process.env.FOLDER_NAME, 1000, 1000) ;

        console.log("Image upload result: ", uploadResult) ;

        // update the user schema of the user
        const updatedUserDetails = await User.findOneAndUpdate({_id: userId},
            {
                image: uploadResult.secure_url,
            },
            {new: true}
        ) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile Picture Uploaded Successfully",
            updatedUserDetails
        }) ;
    } catch (err) {
        console.log(err) ;
        return res.status(400).json({
            success: false,
            message: err.message
        }) ;
    }
}

exports.removeProfilePicture = async(req, res) => {
    try{
        const userId = req.user.id ;
    
        console.log("User id : ", userId) ;

        const user = await User.findById(userId) ;
        // console.log("User : ", user) ;

        const firstName = user.firstName ;
        const lastName = user.lastName ;

        console.log(firstName, " ", lastName) ;
    
        // update the user schema of the user
        const updatedUserDetails = await User.findOneAndUpdate({_id: userId},
            {
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            },
            {new: true}
        ) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile Picture Removed Successfully",
            updatedUserDetails
        }) ;
    }
    catch(err){
        console.log(err) ;
        return res.status(400).json({
            success: false,
            message: err.message
        }) ;
    }
}

// TODO -- done : write controller for getEnrolledCourses
exports.getEnrolledCourses = async(req, res) => {
    try{
        // fetch userId
        const userId = req.user.id ;

        let userDetails = await User.findById(userId).populate({
                                                            path: "courses",
                                                            populate: {
                                                                path: "courseContent",
                                                                populate: {
                                                                path: "subSection",
                                                                },
                                                            },
                                                        })
                                                        .exec() ;

        console.log("User Details before updating time duration : ", userDetails) ;

        // adding time duration to each course && progress percentage
        userDetails = userDetails.toObject() ;
    
        let subSectionLength = 0 ;

        for (let i = 0 ; i < userDetails.courses.length ; i++) {
            let totalDurationInSeconds = 0 ;
            subSectionLength = 0 ;

            console.log("Inside 1st loop") ;

            for (let j = 0 ; j < userDetails.courses[i].courseContent.length ; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0) ;
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds) ;
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length ;
            } 

            let courseProgressCount = await CourseProgress.findOne({courseID: userDetails.courses[i]._id,userId: userId}) ;

            courseProgressCount = courseProgressCount?.completedVideos.length ;

            if(subSectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100 ;
            }
            else{
                // make it up to 2 decimal point
                const multiplier = Math.pow(10, 2) ;

                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier ;
            }
        }

        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Cannot find user with id: ${userDetails}`,
            }) ;
        }

        console.log("User's after updating time duration : ", userDetails) ;

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        }) ;
    }
    catch(err){
        console.log("Error occured in get enrolled courses : ", err) ;
        return res.status(500).json({
            success: false,
            message: err.message,
        }) ;
    }
}

exports.instructorDashboard = async(req, res) => {
    try{
        // fetch the data
        const instructorId = req.user.id ;

        console.log("Req's user id : ", req.user.id) ;

        // validate data
        const courseDetails = await Course.find({instructor: instructorId}) ;

        console.log("Course Details : ", courseDetails) ;

        const coursesData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length ;

            const totalAmountGenerated = totalStudentsEnrolled * course.price ;

            // creating a new object with additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats ;
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "Courses' data for Instructor Dashboard fetched Successfully.",
            coursesData
        }) ;
    }
    catch(err){
        console.log("Error occured in Instructor Dashboard controller : ", err) ;
        return res.status(500).json({
            success: false,
            message: "Error occured in Instructor Dashboard",
            error: err
        }) ;
    }
}