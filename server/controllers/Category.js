const Category = require("../models/Category") ;
const Course = require("../models/Course");

function getRandomInt(max) {
    return Math.floor(Math.random() * max) ;
}

// handler function to create Category
exports.createCategory = async(req, res) => {
    try{
        // get data
        const {name, description} = req.body ;

        // validate data
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        // check whether the category with the same name exists or not
        const categoryPresent = await Category.find({name: name}) ;

        // forEach loop won't work here as return inside a forEach does not exit the loop or the surrounding function.
        for(let i = 0 ; i < categoryPresent.length ; i++){
            if(name.toLocaleLowerCase() === categoryPresent[i].name.toLowerCase()){
                console.log("Category is already present : ", categoryPresent) ;

                return res.status(500).json({
                    success: false,
                    message: "Category Already Exists"
                }) ;
            }
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description
        })

        console.log(categoryDetails) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    }
    catch(err){
        console.log("Error occured in creating Category") ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// handler function to edit a category
exports.editCategory = async(req, res) => {
    try{
        const { categoryId, ...updatedInformation } = req.body ;

        console.log("Updated Info : ", updatedInformation) ;

        const categoryDetails = await Category.findById(categoryId) ;

        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: `Category Not Found with category id : ${categoryId}`
            }) ;
        }

        // how to update all the remaining information using a for loop ??
        for(const item in updatedInformation){
            if(updatedInformation.hasOwnProperty(item)){
                console.log("Properties of category : ", item, updatedInformation[item]) ;
                categoryDetails[item] = updatedInformation[item] ;
                console.log("Updated properties of category : ", item, " : ", categoryDetails[item]) ;
            }
        }

        categoryDetails.save() ;

        // fetch the updated category
        const updatedCategory = await Category.findById(categoryId).populate("course") ;

        console.log("Updated Category : ", updatedCategory) ;

        // return the updated category details
        return res.status(200).json({
            success: true,
            message: "Category updated/edited Successfully",
            updatedCategory
        }) ;
    }
    catch(err){
        console.log("Error occured while editing the category ", err.message) ;
        return res.status(400).json({
            success: false,
            message: "Error occurred while editing category",
            error: err.message 
        }) ;
    }
}

// handler function to get all Categories
exports.showAllCategories = async(req, res) => {
    try{
        // const allCategoriesDetails = await Category.find({}, {name: true, description: true, course: true}) ;
        const allCategoriesDetails = await Category.find({}) ;

        console.log(allCategoriesDetails) ;

        return res.status(200).json({
            success: true,
            message: "All categories are fetched successfully",
            allCategoriesDetails
        }) ;
    }
    catch(err){
        console.log("Error occured in showing all categories") ;
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// TODO -- done: get top 10 selling courses
exports.categoryPageDetails = async(req, res) => {
    try{
        // get categoryId
        const {categoryId} = req.body ;

        // console.log("Category id in category page details : ", categoryId) ;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId).populate({
                                                                        path: "course",
                                                                        match: { status: "Published" },
                                                                        populate: [
                                                                        { path: "ratingAndReviews" }
                                                                        ]
                                                                    }).exec() ;

        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Courses not found related to the given category"
            }) ;
        }

        // get courses for different categories
        const otherCategories = await Category.find({
            _id: { $ne: categoryId },
            course: { $not : { $size : 0 }}
        }) ;

        // console.log("Other categories : ", otherCategories) ;

        let differentCategories = await Category.findById(otherCategories[getRandomInt(otherCategories.length)]._id)
            .populate({
                path: "course",
                match: { status: "Published" },
            })
            .exec() ;

        // console.log("Different Categories' Courses", differentCategories) ;

        // get top 10 selling courses
        const top10Courses = await Course.find({status: "Published"}).sort({ studentsEnrolled: -1}).limit(10).populate("instructor").populate("category").populate("ratingAndReviews").exec() ;

        console.log("Top 10 selling courses : ", top10Courses) ;

        // return response  
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                top10Courses
            }
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// handler function to get details about a specific category
exports.getSpecificCategoryDetails = async(req, res) => {
    try{
        const { categoryId } = req.body ;

        const categoryDetails = await Category.findById(categoryId).populate("course") ;

        if(!categoryDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find category with id: ${categoryId}`
            }) ;
        }

        console.log(`Category details based on id - ${categoryId} : ${categoryDetails} `) ;

        return res.status(200).json({
            success: true,
            message: "Category details fetched Successfully",
            categoryDetails
        }) ;
    }
    catch(err){
        console.log("Error occured while fetching the category details : ", err.message) ;

        return res.status(500).json({
            success: false,
            message: "Some error occured in fetching the category details.",
            error: err.message
        }) ;
    }
}