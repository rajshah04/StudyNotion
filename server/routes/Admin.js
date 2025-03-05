const express = require("express") ;
const router = express.Router() ;

const { getAllInstructorsDetails, getCourses, getCourseDetails } = require("../controllers/Admin") ;
const {auth, isAdmin} = require("../middlewares/auth") ;

// route for getting all instructors details (only by admin)
router.get("/getInstructorsDetails", auth, isAdmin, getAllInstructorsDetails) ;

// route for getting courses (only by admin)
router.post("/getCourses", auth, isAdmin, getCourses) ;

// route for getting course's details (only by admin)
router.post("/getCourseDetails", auth, isAdmin, getCourseDetails) ;


module.exports = router