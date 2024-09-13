const Profile = require("../models/Profile") ;
const User = require("../models/User") ;
const Course = require("../models/Course") ;
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");

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

// TODO: done -- delete account
// Explore -> how can we schedule this deletion operation (cronjob)
exports.deleteAccount = async(req, res) => {
    try{

        // get user id
        let userId = req.user.id ;

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
    } catch (error) {
        console.log(error) ;
        return res.status(400).json({
            success: false,
            message: error.message
        }) ;
    }
}