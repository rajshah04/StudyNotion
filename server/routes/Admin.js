const express = require("express") ;
const router = express.Router() ;

const { getAllInstructorsDetails, getCourses, getCourseDetails } = require("../controllers/Admin") ;
const {auth, isAdmin, isInstructor, isAdminOrInstructor} = require("../middlewares/auth") ;

// route for getting all instructors details (only by admin)
router.get("/getInstructorsDetails", auth, isAdmin, getAllInstructorsDetails) ;

// route for getting courses (only by admin)
router.post("/getCourses", auth, isAdmin, getCourses) ;

// route for getting course's details (only by admin & instructor)
router.post("/getCourseDetails", auth, isAdminOrInstructor, getCourseDetails) ;


module.exports = router