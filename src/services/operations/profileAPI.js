import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const { GET_USER_ENROLLED_COURSES_API } =  profileEndpoints ;

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        }) ;

        console.log("Response of fetching ENROLLED_COURSES_API ---> ", response) ;

        if(!response.data.success){
            throw new Error(response.data.message) ;
        }

        result = response.data.data ;
        toast.success("Enrolled courses fetched successfully.") ;
    
    }
    catch(err){
        console.log("Error in fetching ENROLLED_COURSES_API ---> ", err) ;
        toast.error("Error in fetching enrolled courses details") ;
    }

    toast.dismiss(toastId) ;
    return result ;
}