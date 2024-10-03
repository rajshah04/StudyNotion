const SubSection = require("../models/SubSection") ;
const Section = require("../models/Section") ;
const {uploadImageToCloudinary} = require("../utils/imageUploader") ;

// create subsection
exports.createSubSection = async(req, res) => {
    try{

        // fetch data from req body
        const {sectionId, title, description} = req.body ;

        // extract file/video
        // console.log("Req : ", req) ;
        // console.log(req.files) ;
        const video = req.files.videoFile ;
        // console.log(video) ;

        // validate data
        if(!sectionId || !title || !description || !video){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            }) ;
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME) ;

        console.log("Upload details of the video on cloudinary: ", uploadDetails) ;

        // create entry in the SubSection Schema
        const newSubSection = await SubSection.create(
                                                        {
                                                            title: title,
                                                            timeDuration:`${uploadDetails.duration}`,
                                                            description,
                                                            videoUrl: uploadDetails.secure_url,

                                                        }
                                                    ) ;

        // update the SubSection _id in the respective Section Schema
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                    {
                                                                        $push: {
                                                                            subSection: newSubSection._id
                                                                        }
                                                                    },
                                                                    {
                                                                        new: true
                                                                    }
                                                                ).populate("subSection") ;

        // log updated section here, after adding the populate query
        console.log("Updated Section Details: ", updatedSection) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection created Successfully.",
            updatedSection
        }) ;

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Some error occured while creating SubSection, please try again.",
            error: err.message
        }) ;
    }
}

// TODO -- done : update the subsection
exports.updateSubSection = async(req, res) => {
    try{
        // fetch the data
        const {sectionId, subSectionId, title, description} = req.body ;

        const subSection = await SubSection.findById(subSectionId) ;

        // validate the data
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "Subsection Not Found."
            }) ;
        }

        console.log("SubSection (before update) : ", subSection) ;

        if(title){
            subSection.title = title ;
        }

        if(description){
            subSection.description = description ;
        }

        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile ;

            // upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME) ;
            
            console.log("Video file uploaded on cloud : ", uploadDetails) ;

            subSection.videoUrl = uploadDetails.secure_url ;
            subSection.timeDuration = uploadDetails.durations ;
        }

        // update the subsection
        await subSection.save() ;

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec() ;

        console.log("Updated Section : ", updatedSection) ;

        // return the updated section
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully, sending updated section in data" ,
            data: updatedSection
        }) ;
    }
    catch(err){
        console.log("Error in updating the subsection", err.message) ;

        return res.status(500).json({
            success: false,
            message: "Some error occured in updating the subsection"
        }) ;
    }
}

// delete the subsection
exports.deleteSubSection = async(req, res) => {
    try{
        // fetch the data
        const {subSectionId, sectionId} = req.body ;

        const section = await Section.findByIdAndUpdate({_id: sectionId},
                                            {
                                                $pull:{
                                                    subSection: subSectionId
                                                }
                                            },
                                            {
                                                new: true
                                            }
        ).populate("subSection").exec() ;

        console.log("Section : ", section) ;

        const deletedSubSection = await SubSection.findByIdAndDelete({_id: subSectionId}) ;

        console.log("Subsection deleted successfully", deletedSubSection) ;

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            }) ;
        }

        return res.json({
            success: true,
            message: "SubSection deleted Successfully and sending the updated section in data",
            data: section,
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}