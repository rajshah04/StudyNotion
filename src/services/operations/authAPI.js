import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector" ;
import { setUser } from "../../slices/profileSlice";


const {LOGIN_API, SIGNUP_API, SENDOTP_API, RESETPASSWORDTOKEN_API, RESETPASSWORD_API} = authEndpoints ;


export function login(email, password, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", LOGIN_API, {email, password}) ;

            console.log("LOGIN API RESPONSE ----> ", response) ;
            // console.log(response.data.token) ;

            if(!response.data.success){
                // toast.error(response.response.data.message) ;
                throw new Error(response.data.message) ;
            }

            toast.success("Logged In") ;
            
            dispatch(setToken(response.data.token)) ;
            
            const userImage = response.data?.user?.image ? response.data?.user?.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}` ;
            dispatch(setUser({...response.data.user, image: userImage})) ;

            localStorage.setItem("token", JSON.stringify(response.data.token)) ;
            navigate("/dashboard/my-profile") ;
        }
        catch(err){
            console.log("LOGIN API ERROR............", err) ;
            toast.error(err.response.data.message) ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}

export function signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            }) ;

            console.log("Response of sending signup data ---> ", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success("Signed Up") ;
            navigate("/login") ;
        }
        catch(err){
            console.log("SIGNUP API ERROR ---> ", err) ;
            toast.error("Signup Failed") ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}

export function sendotp(email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            }) ;

            console.log("Response for OTP ---> ", response) ;

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
        
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(err){
            console.log("SENDOTP API ERROR ---> ", err) ;
            toast.error("OTP not sent") ;
            navigate("/signup") ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null)) ;
        dispatch(setUser(null)) ;
        
        // TODO : function to reset cart

        localStorage.removeItem("token") ;
        toast.success("Logged Out") ;
        navigate("/") ;
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
                email,
            }) ;

            console.log("RESET PASSWORD TOKEN RESPONSE ---> ", response) ;

            // console.log(response.data) ;
 
            if(!response.data.success){
                toast.error(response.data.message) ;
                // throw new Error(response.data.message) ;
            }
            else{
                // toast.success(response.data.message) ;
                toast.success("Email sent.") ;
                setEmailSent(true) ;
            }

        }
        catch(err){
            console.log("RESET PASSWORD TOKEN API ERROR ---> ", err) ;
            toast.error(err.response.data.message) ;
        }

        dispatch(setLoading(false)) ;
        // toastId.dismiss() ;
    }
}

export function resetPassword(token, password, confirmPassword){
    return async(dispatch) => {
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {token, password, confirmPassword}) ;

            console.log("RESET PASSWORD API RESPONSE ---> ", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success("Password Reset Successful") ;
        }
        catch(err){
            console.log("RESET PASSWORD ERROR --->", err) ;
            toast.error("Password is not updated. Please try again later.")
        }

        dispatch(setLoading(false)) ;
    }
}