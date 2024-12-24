import toast from "react-hot-toast";
import { categories } from "../apis";
import { apiConnector } from "../apiconnector";

const { SHOW_ALL_CATEGORIES_API, ADD_NEW_CATEGORY_API, GET_CATEGORY_DETAILS_API, EDIT_CATEGORY_API } = categories ;

export const getAllCategories = async() => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{

        const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API) ;

        console.log("SHOW_ALL_CATEGORIES_API RESPONSE ---> ", response) ;

        if(!response.data.message){
            throw new Error(response.data.error) ;
        }

        result = response.data.allCategoriesDetails ;

    }catch(err){
        console.log("SHOW_ALL_CATEGORIES_API ERROR ---> ", err) ;
        toast.error(err.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

export const addNewCategory = async(data, token) => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{
        const response = await apiConnector("POST", ADD_NEW_CATEGORY_API, data, {
            Authorization: `Bearer ${token}`,
        }) ;

        console.log("ADD_NEW_CATEGORY_API RESPONSE ---> ", response) ;

        if(!response.data.message){
            throw new Error(response.data.error) ;
        }

        result = response.data.allCategoriesDetails ;
        toast.success("Category Added Successfully") ;
    }catch(err){
        console.log("ADD_NEW_CATEGORY_API ERROR ---> ", err) ;
        toast.error(err?.response?.data?.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

export const getSpecificCategoryDetails = async(categoryId) => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    try{

        const response = await apiConnector("POST", GET_CATEGORY_DETAILS_API, { categoryId }) ;

        console.log("GET_CATEGORY_DETAILS_API RESPONSE ---> ", response) ;

        if(!response.data.message){
            throw new Error(response.data.error) ;
        }

        result = response.data.categoryDetails ;

    }catch(err){
        console.log("GET_CATEGORY_DETAILS_API ERROR ---> ", err) ;
        toast.error(err?.response?.data?.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}

// edit the category details
export const editCategoryDetails = async (data, token) => {
    let result = null ;
    const toastId = toast.loading("Loading...") ;
  
    try {
        const response = await apiConnector("POST", EDIT_CATEGORY_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        }) ;
      
        console.log("EDIT CATEGORY API RESPONSE............", response) ;
        
        if (!response?.data?.success) {
            throw new Error("Could Not Update Category Details") ;
        }
        
        toast.success("Category Details Updated Successfully") ;
        result = response?.data?.updatedCategory ;
    } catch (err) {
        console.log("EDIT CATEGORY API ERROR............", err) ;
        toast.error(err.message) ;
    }
  
    toast.dismiss(toastId) ;
    return result ;
}