import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogueData } from "../apis";

const {CATALOGUE_PAGE_DATA_API} = catalogueData ;

export const getCataloguePageData = async(categoryId) => {
    const toastId = toast.loading("Loading...") ;
    let result = [] ;

    console.log("Category id in catalogue page API : ", categoryId) ;

    try{

        const response = await apiConnector("POST", CATALOGUE_PAGE_DATA_API, 
            { categoryId: categoryId }) ;

        console.log("Response of fetching CATALOGUE PAGE Details : ", response) ;
        
        if(!response?.data?.success)
            throw new Error("Could not Fetch Catalogue page data");

        
        toast.success("Catalogue Data fetched Successfully") ;
        result = response?.data ;

        console.log("Result in CATALOGUE PAGE Details API : ", result) ;
    }
    catch(err){
        console.log("CATALOGUE PAGE DATA API ERROR....", err) ;
        toast.error(err.message) ;
    }

    toast.dismiss(toastId) ;
    return result ;
}