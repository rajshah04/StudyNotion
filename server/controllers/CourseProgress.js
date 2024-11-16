const SubSection = require("../models/SubSection") ;
const CourseProgress = require("../models/CourseProgress") ;


exports.updateCourseProgress = async(req, res) => {

    const {courseId, subSectionId} = req.body ;
    const userId = req.user.id ;

    try{
        // check whether the subsection is valid or not
        const subSection = await SubSection.findById(subSectionId) ;

        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection Not Found."
            }) ;
        }

        // check for old entry
        let courseProgress = await CourseProgress.findOne({courseId: courseId, userId: userId}) ;

        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: "Course Progress Does Not Exist."
            }) ;
        }
        else{
            // check for re-completing video / subsection
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success: false,
                    error: "SubSection Already Completed."
                }) ;
            }

            // push into completed video
            courseProgress.completedVideos.push(subSectionId) ;
        }

        await courseProgress.save() ;

        return res.status(200).json({
            success: true,
            message: "Course Progress Updated Successfully."
        }) ;
    }catch(err){
        console.log("Error occured in update course progress controller : ", err) ;

        return res.status(400).json({
            success: false,
            message: "An error occured.",
            error: err.message
        }) ;
    }
}