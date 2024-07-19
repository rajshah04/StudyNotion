const User = require("../models/User") ;
const Profile = require("../models/Profile") ;
const otpGenerator = require("otp-generator") ;
const OTP = require("../models/OTP") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;
const mailSender = require("../utils/mailSender") ;
const { passwordUpdated } = require("../mail/templates/passwordUpdate") ;

// send otp
exports.sendOTP = async(req, res) => {
    try{

        // fetch email from req ki body
        const {email} = req.body ;
        
        // check if user already exists
        const checkUserPresent = await User.findOne({email}) ;

        if(checkUserPresent){
            // user already exists
            return res.status(401).json({
                success: false,
                message: "User is already Registered"
            }) ;
        }

        // user is not present
        // generate otp

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        }) ;

        console.log("OTP Generated", otp) ;

        // check unique otp or not
        let result = await OTP.findOne({otp: otp}) ;

        // below is the worst way to find the unique otp
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            }) ;
    
            console.log("OTP Generated", otp) ;
    
            // check unique otp or not
            result = await OTP.findOne({otp: otp}) ;
        }

        const otpPayload = {email, otp} ;

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload) ;

        console.log("entry created of otp in db", otpBody) ;

        // return response successful
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp: `${otp}`
        }) ;

    }catch(err){

        // console.error(err) ;
        console.log("Error occured in sending OTP", err) ;

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// sign up
exports.signUp = async(req, res) => {
    try{
        // data fetch from request ki body
        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body ;

        // validate kar lo
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }
        
    // Check if password and confirm password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again."
            })
        }

        // check user already exist or not
        const userExists = await User.findOne({email}) ;
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue."
            })
        }

        console.log("Current OTP : ", otp) ;
        
        // find most recent OTP stored for the user
        const recentOTP = await OTP.find({email: email}).sort({createdAt: -1});

        console.log("Recent otp: ", recentOTP) ;

        if(recentOTP.length == 0){
            // otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            }) ;
        }

        // validate OTP
        if(recentOTP[0].otp !== otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "OTP does not match"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10) ;

        console.log("Hashed password: ", hashedPassword) ;

        // THE Instructor needs to be approved
        let approved = "" ;
        approved === "Instructor" ? (approved = false) : (approved = true)

        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        // entry create in DB

        const userData =  await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            approved,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            userData
        })

    }catch(err){
        console.log("Error occured while  registering user", err.message) ;
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again"
        })
    }
}

// login
exports.logIn = async(req, res) => {
    try{
        // get data from req body
        const {email, password} = req.body ;

        // validation data
        if(!email || !password){
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            }) ;
        }

        //  user check exists or not
        const user = await User.findOne({email}).populate("additionalDetails") ;
        // const user = await User.findOne({email}) ;
        if(!user){
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: "User is not registered, Please sign up first"
            }) ;
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            } ;

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            }) ;

            // user = user.toObject() ;
            user.token = token ;
            user.password = undefined ;
            
            // create cookie and send response
            
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully"
            }) ;

        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect"
            }) ;
        }

    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: "Login failure, Please try again later"
        }) ;

    }
}

// changePassword
// TODO: HOMEWORK -- done
exports.changePassword = async(req, res) => {
    try{

        // get data from req body
        // get oldPassword, newPassword, confirmPassword
        const {oldPassword, newPassword, confirmPassword} = req.body ;

        // validation
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(403).json({
                success: false ,
                message: "All fields are required."
            }) ;
        }

        if(oldPassword === newPassword){
            return res.status(403).json({
                success: false ,
                message: "Old Password and New Password cannot be same."
            }) ;
        }

        if(newPassword !== confirmPassword){
            return res.status(403).json({
                success: false ,
                message: "New Password and Confirm Password should be same."
            }) ;
        }

        // how to fetch email id of user from the token
        const email = req.user.email ;

        const user = await User.findOne({email}) ;

        if(!await bcrypt.compare(oldPassword, user.password)){
            return res.status(400).json({
                success: false,
                message: "Old passsword do not match."
            }) ;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10) ;

        console.log("Hashed password: ", hashedPassword) ;

        // update password in DB
        const updatedUserDetails = await User.findOneAndUpdate({email: email},{password: hashedPassword} ,{new: true}) ;

        try{
            // send mail -- Password updated
            const sendMail = await mailSender(email, 
                "Password for your account has been updated", 
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )) ;
    
            console.log("Result of sending mail of updated password: ", sendMail.response) ;
        }catch(err){
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", err)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: err.message,
            }) ;
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully"
        }) ;

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Some error occured while updating the password, please try again",
            error: err.message
        }) ;
    }
}