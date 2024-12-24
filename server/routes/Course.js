const express = require("express") ;
const router = express.Router() ;

const {createCourse, getAllCourses, getCourseDetails, getInstructorCourses, deleteCourse, editCourse, getFullCourseDetails} = require("../controllers/Course") ;
const {createSection, updateSection, deleteSection} = require("../controllers/Section") ;
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection") ;
const {createCategory, showAllCategories, categoryPageDetails, getSpecificCategoryDetails, editCategory} = require("../controllers/Category") ;
const {createRating, getAverageRating, getAllRating, getCourseRelatedRating} = require("../controllers/RatingAndReview") ;
const {updateCourseProgress} = require("../controllers/CourseProgress") ;

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth") ;

// COURSE ROUTES

// Courses can only be created by instructors
router.post("/createCourse", auth, isInstructor, createCourse) ;

// edit a course
router.post("/editCourse", auth, isInstructor, editCourse) ;
// delete a course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse) ;

// add a section to a course
router.post("/addSection", auth, isInstructor, createSection) ;
// update a section
router.post("/updateSection", auth, isInstructor, updateSection) ;
// delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection) ;

// add a subsection
router.post("/addSubSection", auth, isInstructor, createSubSection) ;
// update a subsection
router.post("/updateSubSection", auth, isInstructor, updateSubSection) ;
// delete a subsection
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection) ;


// route for getting a list of all available courses
router.get("/getAllCourses", getAllCourses) ;
// route for getting details of a specific course by id
router.post("/getCourseDetails", getCourseDetails) ;
// route for getting details of a specific course
router.post("/getFullCourseDetails", auth, getFullCourseDetails) ;

// route for getting all the courses of a particular Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses) ;


// CATEGORY ROUTES (only by Admin)

// category can only be created by admin
router.post("/createCategory", auth, isAdmin, createCategory) ;
router.get("/showAllCategories", showAllCategories) ;
router.post("/getCategoryPageDetails", categoryPageDetails) ;
router.post("/getSpecificCategoryDetails", getSpecificCategoryDetails) ;
router.post("/editCategory", auth, isAdmin, editCategory) ;


// RATING AND REVIEW 

// route for creating a rating, only student can create a rating
router.post("/createRating", auth, isStudent, createRating) ;
router.get("/getAverageRating", getAverageRating) ;
router.get("/getAllRating", getAllRating) ;
router.post("/getCourseRelatedRating", getCourseRelatedRating) ;

// COURSE PROGRESS

// route to update the course progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress) ;

module.exports = router ;