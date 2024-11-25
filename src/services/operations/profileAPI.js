import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } =  profileEndpoints ;

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

export async function getInstructorData(token){
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        console.log("GET_INSTRUCTOR_DATA_API Response ---> ", response) ;

        if(!response.data.success){
            throw new Error(response.data.message) ;
        }

        result = response?.data?.coursesData ;
        toast.success("Enrolled courses fetched successfully.") ;
    }
    catch(err){
        console.log("GET_INSTRUCTOR_DATA_API Error", err) ;
        toast.error("Could Not Get Instructor Data") ;
    }

    toast.dismiss(toastId) ;
    return result ;
}