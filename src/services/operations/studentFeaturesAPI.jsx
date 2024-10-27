import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { studentEndpoints } = require("../apis");



const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints ;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script") ;
        script.src = src ;

        script.onload = () => {
            resolve(true) ;
        }

        script.onerror = () => {
            resolve(false) ;
        }

        document.body.appendChild(script) ;
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading...") ;
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js") ;
    
        // validate the response
        if(!res){
            toast.error("Razorpay SDK failed to load") ;
            return ;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API , {courses: courses},
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        console.log("Order response in buy courses : ", orderResponse) ;

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message) ;
        }

        // creating the options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            name: "Study Notion",
            order_id: orderResponse.data.message.id,
            description: "Thank You for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function(res){
                // send successful wala mail
                sendPaymentSuccessEmail(res, orderResponse.data.message.amount, token) 
            
                // verifyPayment
                verifyPayment({...res, courses}, token, navigate, dispatch) ;
            }
        }

        // to open the razorpay payment box
        const paymentObj = new window.Razorpay(options) ;
        paymentObj.open() ;
        paymentObj.on("payment.failed", function(response){
            toast.error("Oops!!! Payment failed.") ;
            console.log(response.error) ;
        })
    }
    catch(err){
        console.log("CAPTURE PAYMENT API ERROR ---> ", err) ;
        toast.error("Could not make payment") ;
    }

    toast.dismiss(toastId) ;
}

export async function sendPaymentSuccessEmail(res, amount, token){
    try{
        const response = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: res.razorpay_order_id,
            paymentId: res.razorpay_payment_id,
            amount
        }) ;

        console.log(response) ;
    }   
    catch(err){
        console.log("PAYMENT SUCCESS EMAIL API ERROR ---> ", err) ;
    }
}

// verify payment 
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...") ;
    dispatch(setPaymentLoading(true)) ;

    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        }) ;

        console.log("PAYMENT VERIFY API RESPONSE ---> ", response) ;

        if(!response.data.success){
            throw new Error(response.data.message) ;
        }

        toast.success("Payment Successful, you are added to the course") ;
        navigate("/dashboard/enrolled-courses") ;
        dispatch(resetCart()) ;
    }catch(err){
        console.log("PAYMENT VERIFY API ERROR ---> ", err.message) ;
        toast.error("Could not verify payment") ;
    }

    toast.dismiss(toastId) ;
    dispatch(setPaymentLoading(false)) ;
}