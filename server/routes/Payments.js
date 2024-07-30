const express = require("express") ;
const router = express.Router() ;

const {capturePayment, verifySignature} = require("../controllers/Razorpay") ;
const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth") ;


router.post("/capturePayment", auth, isStudent, capturePayment) ;
router.post("/verifySignature", auth, isStudent, verifySignature) ;

module.exports = router ;