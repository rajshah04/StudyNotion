const Category = require("../models/Category") ;
const Course = require("../models/Course");

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

// handler function to get all Categories
exports.showAllCategories = async(req, res) => {
    try{
        const allCategoriesDetails = await Category.find({}, {name: true, description: true}) ;
        // const allCategoriesDetails = await Category.find({}) ;

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

// TODO: get top 10 selling courses
exports.categoryPageDetails = async(req, res) => {
    try{
        // get categoryId
        const {categoryId} = req.body ;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId).populate("course").exec() ;

        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Courses not found related to the given category"
            }) ;
        }

        // get courses for different categories
        const differentCategories = await Category.find({_id: {$ne: categoryId}}) ;

        // get top 10 selling courses
        const top10Courses = await Course.find({status: "Published"}).sort({ studentsEnrolled: -1}).limit(10).populate("instructor").populate("category").exec() ;

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