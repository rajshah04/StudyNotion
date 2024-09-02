const User = require("../models/User") ;
const mailSender = require("../utils/mailSender") ;
const bcrypt = require("bcrypt") ;


// resetPasswordToken
exports.resetPasswordToken = async(req, res) => {
    try{
        // get email from req body
        const email = req.body.email ;

        // check user for this email, email validation
        const user = await User.findOne({email : email}) ;
        if(!user){
            return res.status(401).json({
                success: false,
                // message: `This email: ${email} is not registered with us. Please enter a valid email. `
                message: `This email address is not registered with us. Please enter a valid email address.`
            }) ;
        }

        // generate token
        const token = crypto.randomUUID() ;

        // const token = crypto.randomBytes(20).toString("hex");


        // update user by adding the token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email},
                                    {
                                        token: token,
                                        resetPasswordExpires: Date.now() + 5 * 60 * 1000 
                                    },
                                    {
                                        new:true
                                    }
        ) ;

        console.log("Updated Details: ", updatedDetails) ;

        // create url
        const url = `https://localhost:3000/update-password/${token}` ;

        // send mail containing the url
        const title = "Password Reset Link" ;

        const result = await mailSender(email, title, `Password Reset Link: ${url} . Please click on this url to reset your password.`) ;

        console.log("Result of sending password reset link in mail", result) ;

        // return response
        return res.status(200).json({
            success: true,
            message: `Password Reset Link is set to ${email}, please check mail and change password`
        }) ;
    }catch(err){
        console.log("Error occured in sending email about password reset link: ", err) ;
        return res.status(403).json({
            success: false,
            message: "Email not sent about passord reset link, please try again"
        }) ;
    }
}

// resetPassword
exports.resetPassword = async(req, res) => {
    try{

        // data fetch
        const {token, password, confirmPassword} = req.body ;
        // frontent collects the above 3 items and sends it to the server

        // validation
        if(!token || !password || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            }) ;
        }
        if(password !== confirmPassword){
            return res.status(500).json({
                success: false,
                message: "Password and Confirm Password Does not Match"
            }) ;
        }

        // get user details from DB using token
        const user = await User.findOne({token: token}) ;
        // TODO: done -- find whether below statement will work or not -- yes
        // const user = await User.findOne({token}) ;
        console.log("user: ", user) ;

        // if no entry - invalid token
        if(!user){
            return res.status(403).json({
                success: false,
                message: "Token is invalid."
            }) ;
        }

        // token time check
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token is expired, please regenerate it."
            }) ; 
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10) ;

        // password update
        const result = await User.findOneAndUpdate({token: token}, 
                                {
                                    password: hashedPassword
                                },
                                {
                                    new: true
                                }
        )
        console.log("password in DB updated successfully", result) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successful"
        }) ;

    }catch(err){
        console.log("Error occured while resetting the password", err) ;
        return res.status().json({
            success: false,
            message: "Something went wrong while resetting the password"
        }) ;
    }
}