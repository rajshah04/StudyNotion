const express = require("express") ;
const router = express.Router() ;

const {capturePayment, verifyPayment} = require("../controllers/Razorpay") ;
const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth") ;


router.post("/capturePayment", auth, isStudent, capturePayment) ;
router.post("/verifyPayment", auth, isStudent, verifyPayment) ;

module.exports = router ;