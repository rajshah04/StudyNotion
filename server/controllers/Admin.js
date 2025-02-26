const User = require("../models/User");

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