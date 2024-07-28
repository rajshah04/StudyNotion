const express = require("express") ;
const router = express.Router() ;

const {auth} = require("../middlewares/auth") ;
const {logIn, signUp, changePassword, sendOTP} = require("../controllers/Auth") ;
const {resetPassword, resetPasswordToken} = require("../controllers//ResetPassword") ;

// route for user signup
router.post("/signup", signUp) ;

// route for user login
router.post("/login", logIn) ;

// route for sending OTP to the user's mail
router.post("/sendotp", sendOTP) ;

// route for changing the password
router.post("/changepassword", auth, changePassword) ;

// route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken) ;

// route for resetting user's password after verification
router.post("/reset-password", resetPassword) ;

module.exports = router ;