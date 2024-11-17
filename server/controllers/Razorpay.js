const {instance} = require("../config/razorpay") ;
const Course = require("../models/Course") ;
const User = require("../models/User") ;
const mailSender = require("../utils/mailSender") ;
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail") ;
const { default: mongoose } = require("mongoose") ;
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail") ;
const crypto = require("crypto") ;
const CourseProgress = require("../models/CourseProgress");


// initiate the razorpay order
exports.capturePayment = async(req, res) => {

    const {courses} = req.body ;
    console.log("Courses in capture payment : ", courses) ;

    const userId = req.user.id ;

    if(courses.length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide course id"
        }) ;
    }

    let totalAmount = 0 ;

    for(const course_id of courses){
        let course ;

        try{
            // console.log("course_id : ", course_id) ;
            // console.log("type of course_id : ", typeof(course_id)) ;
            course = await Course.findById(course_id) ;

            if(!course){
                return res.status(404).json({
                    success: false,
                    message: `Course not find with course id : ${course_id}`
                }) ;
            }

            const uid = new mongoose.Types.ObjectId(userId) ;

            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success: false,
                    message: "Student is already enrolled"
                }) ;
            }

            totalAmount += course.price ;
        }
        catch(err){
            console.log("Error occured in getting courses in capture payment : ", err) ;
            return res.status(500).json({
                success: false,
                message: "Error occured in getting courses in capture payment : ",
                error: err.message
            }) ;
        }

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }

        try{
            const paymentResponse = await instance.orders.create(options) ;

            res.json({
                success: true,
                message: paymentResponse
            }) ;
        }
        catch(err){
            console.log("Error in getting payment response", err) ;

            return res.status(500).json({
                success: false,
                message: "Error occured in getting payment response",
                error: err.message
            }) ;
        }
    }

}

// verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id ;
    const razorpay_payment_id = req.body?.razorpay_payment_id ;
    const razorpay_signature = req.body?.razorpay_signature ;

    const courses = req.body?.courses ;
    const userId = req.user.id ;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(404).json({
            success: false,
            message: "Payment Failed"
        }) ;
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id ;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex") ;

    if(expectedSignature === razorpay_signature){
        // enroll the students 
        await enrollStudents(courses, userId, res) ;

        // return response
        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        }) ;
    }

    return res.status(401).json({
        success: "false" ,
        message: "Payment Failed"
    }) ;
}

// function to enroll the given student into given course/s
const enrollStudents = async(courses, userId, res) => {
    try{
        // go to all the courses in courses[] 1 by 1, and add the user id in the studentsEnrolled of each course
        for(const course of courses){
            const courseDetail = await Course.findByIdAndUpdate(course,
                {
                    $push: {
                        studentsEnrolled: userId
                    }
                },
                {
                    new: true
                }
            ) ;

            if(!courseDetail){
                return res.status(404).json({
                    success: true,
                    message: `Course not found with course id : ${course}`
                })
            }

            console.log("Updated course detail after adding student : ", courseDetail) ;

            const courseProgress = await CourseProgress.create({courseId: courseId, userId: userId, completedVideos: []}) ;

            // find and add the student to their list of enrolled courses
            const user = await User.findByIdAndUpdate(userId, 
                {
                    $push: {
                        courses: course,
                        courseProgress: courseProgress._id,
                    },
                },
                {
                    new: true
                }
            ) ;

            console.log("Updated user info after adding courses to the user : ", user) ;

            // send mail to the student for enrolling in the course
            const emailResponse = await mailSender(
                user.email,
                `Successfully enrolled into ${courseDetail.courseName}`,
                courseEnrollmentEmail(courseDetail.courseName, `${user.firstName}`)
            ) ;

            console.log("Email response after sending course enrollment mail to student : ", emailResponse) ;
        }
        
        // return res
        return res.status(200).json({
            success: true,
            message: "Student enrolled Successfully"
        }) ;
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// send payment successful mail
exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body ;

    const userId = req.user.id ;

    if(!orderId || !paymentId || !amount){
        return res.status(400).json({
            success: false, 
            message: "All fields are necessary"
        }) ;
    }

    try{
        const enrolledStudent = await User.findById(userId) ;

        const mailResponse = await mailSender(enrolledStudent.email, `Payment Received`, paymentSuccessEmail(`${enrolledStudent.firstName}`, amount / 100, orderId, paymentId)) ;

        console.log("Mail response of sending payment success mail : ", mailResponse) ;
    }
    catch(err){
        console.log("Error occured while sending mail : ", err.message) ;
        return res.status(400).json({
            success: false,
            message: "Some error occured while sending email",
            error: err.message
        }) ;
    }
}