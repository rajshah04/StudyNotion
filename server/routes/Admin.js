const express = require("express") ;
const router = express.Router() ;

const { getAllInstructorsDetails } = require("../controllers/Admin") ;
const {auth, isAdmin} = require("../middlewares/auth") ;

// route for getting all instructors details (only by admin)
router.get("/getInstructorsDetails", auth, isAdmin, getAllInstructorsDetails) ;


module.exports = router