import toast from "react-hot-toast";
import { adminEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const { GET_INSTRUCTORS_DATA_API, GET_COURSES_API, GET_COURSE_DETAIL_API } =  adminEndpoints ;


export async function getAllInstructorsData(token){
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("GET", GET_INSTRUCTORS_DATA_API, null, 
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        console.log("GET_INSTRUCTORS_DATA_API Response ---> ", response) ;

        if(!response.data.success){
            throw new Error(response.data.message) ;
        }

        result = response?.data?.instructorsDetails ;
        toast.success("Instructors details fetched successfully.") ;
    }
    catch(err){
        console.log("GET_INSTRUCTORS_DATA_API Error", err) ;
        toast.error("Could Not Get Instructor Data") ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

export async function getCourses(token, courseType){
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("POST", GET_COURSES_API, courseType, 
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        console.log("GET_COURSES_API Response ---> ", response) ;

        if(!response.data.success){
            throw new Error(response.data.message) ;
        }

        result = response?.data?.courses ;
        toast.success("Courses fetched successfully for Admin.") ;
    }
    catch(err){
        console.log("GET_COURSES_API Error", err) ;
        toast.error("Could Not Get Courses Data for Admin.") ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

export async function getCourseDetails(token, data){
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("POST", GET_COURSE_DETAIL_API, data, 
            {
                Authorization: `Bearer ${token}`
            }
        ) ;

        console.log("GET_COURSE_DETAIL_API Response ---> ", response) ;

        if(!response.data.success){
            throw new Error(response.data.message) ;
        }

        result = response?.data?.course ;
        toast.success("Course Details fetched successfully for Admin.") ;
    }
    catch(err){
        console.log("GET_COURSE_DETAIL_API Error", err) ;
        toast.error("Could Not Get Course's Details for Admin.") ;
    }

    toast.dismiss(toastId) ;
    return result ;
}