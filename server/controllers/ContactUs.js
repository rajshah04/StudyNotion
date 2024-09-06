const mailSender = require("../utils/mailSender") ;
const { contactUsEmail } = require("../mail/templates/contactFormResponse") ;

exports.contactUs = async(req, res) => {

    const {firstName, lastName, email, phoneNo, countryCode, message} = req.body ;

    console.log(firstName, lastName, email, phoneNo, countryCode, message)

    console.log(req.body) ;

    try{
        const emailResponse = await mailSender(
            email,
            "Your message sent successfully",
            contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
        ) ;

        console.log("Email response : ", emailResponse) ;

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
        })
    }
    catch(err){
        console.log("Error", err)
        console.log("Error message :", err.message)
        return res.status(400).json({
        success: false,
        message: "Something went wrong...",
        })
    }
}