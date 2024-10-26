const express = require("express") ;
const router = express.Router() ;

const {updateProfile, getAllUserDetails, deleteAccount, updateProfilePicture, removeProfilePicture, getEnrolledCourses} = require("../controllers/Profile") ;
const {auth} = require("../middlewares/auth") ;

// PROFILE ROUTES

// route for updating a profile
router.put("/updateProfile", auth, updateProfile) ;
// route for deleting a profile
router.delete("/deleteAccount", auth, deleteAccount) ;
// route for getting all user's details
router.get("/getAllUserDetails", auth, getAllUserDetails) ;
// TODO: route for updating the profile picture
router.put("/updateProfilePicture", auth, updateProfilePicture) ;
// route for removing the profile picture
router.put("/removeProfilePicture", auth, removeProfilePicture) ;

// route for getting enrolled courses details
router.get("/getEnrolledCourses", auth, getEnrolledCourses) ;


module.exports = router ;