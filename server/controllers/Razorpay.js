const {instance} = require("../config/razorpay") ;
const Course = require("../models/Course") ;
const User = require("../models/User") ;
const mailSender = require("../utils/mailSender") ;
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail") ;
const { default: mongoose } = require("mongoose");


// capture the payment and initiate the Razorpay order
exports.capturePayment = async(req, res) => {

    // get courseId and userId
    const {course_id} = req.body ;
    const userId = req.user.id ;

    // validation
    // valid courseId
    if(!course_id){
        return res.status(404).json({
            success: false,
            message: "Please provide valid course Id"
        }) ;
    }
    // valid courseDetail
    let courseDetails 
    try{
        courseDetails = await Course.findById({course_id}) ;

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Could not find the course"
            }) ;
        }

        // has user already paid for the same course ?
        const userAlreadyEnrolled = courseDetails.studentsEnrolled.find(userId) ;
        if(userAlreadyEnrolled){
            return res.status(500).json({
                success: false,
                message: "Student has already registered for the given course."
            }) ;
        }

        const uid = new mongoose.Types.ObjectId(userId) ;
        if(courseDetails.studentsEnrolled.includes(uid)){
            return res.status(500).json({
                success: false,
                message: "Student is already enrolled for the given course."
            }) ;
        }
    } catch(err){
        console.error(err) ;
        return res.json({
            success: false,
            message: err.message 
        }) ;
    }

    // create order
    const amount = courseDetails.price ;
    const currency = "INR" ;

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course_id,
            userId
        }
    } ;

    try{
        // initiate payment using razorpay
        const paymentResponse = await instance.orders.create(options) ;
        console.log(paymentResponse) ;

        // return response
        return res.status(200).json({
            success: true,
            courseName: courseDetails.courseName,
            courseDescription: courseDetails.courseDescription,
            thumbnail: courseDetails.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(400).json({
            success: false,
            message: err.message
        }) ;
    }
}

// verify signature of Razorpay and Server
exports.verifySignature = async(req, res) => {
    const webhookSecret = "12345678" ;

    const signature = req.headers["x-razorpay-signature"] ;

    const shasum = crypto.createHmac("sha256", webhookSecret) ;
    shasum.update(JSON.stringify(req.body)) ;
    const digest = shasum.digest("hex") ;

    if(signature === digest){
        console.log("Payment is Authorised.") ;

        const {courseId, userId} = req.body.payload.payment.entity.notes ;

        try{
            // fulfill the action

            // find the course and enroll the students in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                                                    {_id: courseId},
                                                                    {
                                                                        $push: {
                                                                            studentsEnrolled: userId,
                                                                        }
                                                                    },
                                                                    {new: true}
                                                                ) ;
                    
            if(!enrolledCourse){
                return res.status(404).json({
                    success: false,
                    message: "Course Not Found"
                }) ;
            }

            console.log(enrolledCourse) ;

            // find the student and add the courses to their list of enrolled courses me
            const enrolledStudent = await User.findOneAndUpdate(
                                                                    {_id: userId},
                                                                    {
                                                                        $push: {
                                                                            courses: courseId,
                                                                        }
                                                                    },
                                                                    {new: true}
            ) ;

            console.log(enrolledStudent) ;

            // mail send krdo confirmation wala
            const emailResponse = await mailSender(enrolledStudent.email,
                                                    "Congratulations from StudyNotion",
                                                    `Congratulations, you are onboarded into ${enrolledCourse.courseName} course on StudyNotion.`
            ) ;
               
            console.log(emailResponse) ;

            return res.status(200).json({
                success: true,
                message: "Signature verified and Courses added Successfully."
            }) ;

        }catch(err){
            console.log(err) ;
            return res.status(400).json({
                success: false,
                message: err.message
            }) ;
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Invalid Request"
        }) ;
    }
}