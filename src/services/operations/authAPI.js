import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector" ;
import { setUser } from "../../slices/profileSlice";


const {LOGIN_API, SIGNUP_API, SENDOPT_API} = authEndpoints ;


export function login(email, password, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", LOGIN_API, {email, password}) ;

            console.log("LOGIN API RESPONSE ----> ", response) ;
            // console.log(response.data.token) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success("Logged in Successful") ;
            
            dispatch(setToken(response.data.token)) ;
            
            const userImage = response.data?.user?.image ? response.data?.user?.image 
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}` ;
            dispatch(setUser({...response.data.user, image: userImage})) ;

            localStorage.setItem("token", JSON.stringify(response.data.token)) ;
            navigate("/dashboard/my-profile") ;
        }
        catch(err){
            console.log("LOGIN API ERROR............", err) ;
            toast.error("Login Failed") ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}