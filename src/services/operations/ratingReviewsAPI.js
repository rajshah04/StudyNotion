import toast from "react-hot-toast";
import { ratingAndReviewEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const { GET_ALL_RATING, GET_COURSE_AVERAGE_RATING, GET_COURSE_RELATED_RATING } = ratingAndReviewEndpoints ;

export const getAllRatings = async() => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("GET", GET_ALL_RATING) ;

        if(!response?.data?.success){
            throw new Error("Could Not Fetch All Courses' Ratings and Reviews") ;
        }
      
        result = response?.data?.data ;
    }
    catch(err){
        console.log("GET_ALL_RATING_API API ERROR............", err) ;
        toast.error(err.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

export const getCourseAvgRating = async(data) => {
    // not checked
    const toastId = toast.loading("Loading...") ;
    let result ;

    try{
        const response = await apiConnector("GET", GET_COURSE_AVERAGE_RATING, data) ;

        console.log("GET_COURSE_AVERAGE_RATING_API API RESPONSE............", response) ;

        if(!response?.data?.success){
            throw new Error("Could Not Fetch All Courses' Ratings and Reviews") ;
        }
      
        result = response?.data?.data ;
    }
    catch(err){
        console.log("GET_COURSE_AVERAGE_RATING_API API ERROR............", err) ;
        toast.error(err.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

export const getCourseRelatedRatings = async(courseId) => {
    // not checked
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    // console.log("Course Id : ", courseId) ;

    try{
        const response = await apiConnector("POST", GET_COURSE_RELATED_RATING, {courseId}) ;

        console.log("GET_COURSE_RELATED_RATING_API API RESPONSE............", response) ;

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course's Ratings and Reviews") ;
        }
      
        result = response?.data?.allCourseRelatedReviews ;
    }
    catch(err){
        console.log("GET_RELATED_RATING_API API ERROR............", err) ;
        toast.error(err.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}