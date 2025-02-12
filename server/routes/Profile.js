const express = require("express") ;
const router = express.Router() ;

const {updateProfile, getAllUserDetails, deleteAccount, updateProfilePicture, removeProfilePicture, getEnrolledCourses, instructorDashboard, getAllInstructorsDetails, instructorDetails} = require("../controllers/Profile") ;
const {auth, isInstructor, isAdmin} = require("../middlewares/auth") ;

// PROFILE ROUTES

// route for updating a profile
router.put("/updateProfile", auth, updateProfile) ;
// route for deleting a profile
router.delete("/deleteAccount", auth, deleteAccount) ;
// route for getting all user's details
router.get("/getAllUserDetails", auth, getAllUserDetails) ;
// route for updating the profile picture
router.put("/updateProfilePicture", auth, updateProfilePicture) ;
// route for removing the profile picture
router.put("/removeProfilePicture", auth, removeProfilePicture) ;

// route for getting enrolled courses details
router.get("/getEnrolledCourses", auth, getEnrolledCourses) ;

// route for getting instructor dashboard's data
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard) ;

// route for getting a particular instructor's details
router.post("/getInstructorDetails", instructorDetails) ;

// route for getting all instructors details (only by admin)
router.get("/getInstructorsDetails", auth, isAdmin, getAllInstructorsDetails) ;


module.exports = router ;