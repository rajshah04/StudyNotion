import toast from "react-hot-toast";
import { categories } from "../apis";
import { apiConnector } from "../apiconnector";

const { SHOW_ALL_CATEGORIES_API } = categories ;

export const getAllCategories = async() => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{

        const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API) ;

        console.log("SHOW_ALL_CATEGORIES_API RESPONSE ---> ", response) ;

        result = response.data.allCategoriesDetails ;

    }catch(err){
        console.log("SHOW_ALL_CATEGORIES_API ERROR ---> ", err) ;
        toast.error(err.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}