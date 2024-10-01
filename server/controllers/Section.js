const Section = require("../models/Section") ;
const Course = require("../models/Course") ;
const SubSection = require("../models/SubSection") ;

exports.createSection = async (req, res) => {
    try{

        // data fetch
        const {sectionName, courseId} = req.body ;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        // create section
        const newSection = await Section.create({sectionName}) ;

        // update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push: {
                                                        courseContent: newSection._id,
                                                } 
                                            },
                                            {
                                                new: true
                                            }
                                        )
                                        .populate({
                                            path: "courseContent",
                                            populate: {
                                                path: "subSection",
                                            },
                                        })
                                        .exec();
        // HW: how to use populate() in such a way that I can populate section as well as subsection
        // HW: use populate to replace sections/subsections both in the updatedCourseDetails
                                        
                                        
        // return response
        return res.status(200).json({
            success: true,
            message: "Section added successfully",
            updatedCourseDetails
        }) ;
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again.",
            error: err.message
        }) ;
    }
}

exports.updateSection = async(req, res) => {
    try{
        // fetch data - sectionName, sectionId
        const {sectionName, sectionId, courseId} = req.body ;

        // validate data
        if(!sectionName || !sectionId || !courseId){
            return res.status.json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        // update data
        const updatedSectionDetails = await Section.findByIdAndUpdate(
                                                    sectionId,
                                                    {
                                                        sectionName: sectionName,
                                                    },
                                                    {
                                                        new: true
                                                    }
                                                ) ;

        console.log("Updated Section Details - controllers : ", updatedSectionDetails) ;

        const course = await Course.findById(courseId).populate({path:"courseContent", 
            populate:{path:"subSection",},
        }).exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
            data: course,
        }) ;

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Some error occured while updating the Section, please try again",
            error: err.message
        }) ;
    }
}

exports.deleteSection = async(req, res) => {
    try {

		const {sectionId, courseId} = req.body;

		const updatedCourse = await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		}) ;

        console.log("Updated Course : ", updatedCourse) ;

		const section = await Section.findById(sectionId);

		console.log(sectionId, courseId);

		if(!section){
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (err) {
		console.error("Error deleting section:", err);
		res.status(500).json({
			success: false,
			message: "Some error occured while deleting the section",
		});
	}
}