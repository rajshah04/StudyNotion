const SubSection = require("../models/SubSection") ;
const Section = require("../models/Section") ;
const {uploadImageToCloudinary} = require("../utils/imageUploader") ;

// create subsection
exports.createSubSection = async(req, res) => {
    try{

        // fetch data from req body
        const {sectionId, title, description} = req.body ;

        // extract file/video
        const video = req.files.videoFile ;

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

        console.log("Updated Section Details: ", updatedSection) ;

        // HW: log updated section here, after adding the populate query
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

// update the subsection
exports.updateSubSection = async(req, res) => {
    try{
        
    }catch(err){

    }
}

// delete the subsection
exports.deleteSubSection = async(req, res) => {
    try{
        return res.json({
            success: true,
            message: "SubSection deleted Successfully"
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}