import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";


const {UPDATE_PROFILE_PICTURE_API, REMOVE_PROFILE_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_ACCOUNT_API} = settingsEndpoints ;

export function updateProfilePicture(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...") ;

        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }) ;

            console.log("UPDATE_PROFILE_PICTURE_API API RESPONSE............", response) ;
        
            if (!response.data.success) {
               throw new Error(response.data.message) ;
            }

            toast.success("Profile Picture Updated Successfully") ;
            dispatch(setUser(response.data.updatedUserDetails)) ;

            localStorage.setItem("user", response.data.updatedUserDetails) ;
        }
        catch(err){
            console.log("UPDATE_PROFILE_PICTURE_API API ERROR............", err) ;
            toast.error("Could Not Update Profile Picture") ;
        }

        toast.dismiss(toastId) ;
    }
}

export function removeProfilePicture(token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...") ;
        console.log(token) ;

        try{
            const response = await apiConnector("PUT", REMOVE_PROFILE_PICTURE_API, null, {
                Authorization: `Bearer ${token}`,
            }) ;

            console.log("REMOVE_PROFILE_PICTURE_API API RESPONSE............", response) ;
        
            if (!response.data.success) {
               throw new Error(response.data.message) ;
            }

            toast.success("Profile Picture Updated Successfully") ;
            dispatch(setUser(response.data.updatedUserDetails)) ;
            
            // const userImage = response.data?.user?.image ? response.data?.user?.image 
            // : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}` ;
            // dispatch(setUser({...response.data.user, image: userImage})) ;

            // // console.log("Printing USER info", response.data.user) ;
            
            // localStorage.setItem("token", JSON.stringify(response.data.token)) ;
            // localStorage.setItem("user", JSON.stringify(response.data.user)) ;
        }
        catch(err){
            console.log("REMOVE_PROFILE_PICTURE_API API ERROR............", err) ;
            toast.error("Could Not Remove Profile Picture") ;
        }

        toast.dismiss(toastId) ;
    }
}

export function updateProfile(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...") ;

        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`,
            }) ;

            console.log("TOKEN : ", token) ;
            console.log("FORM DATA : ", formData) ;

            console.log("UPDATE PROFILE API RESPONSE ---> ", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            // const userImage = response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image
            // : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}` ;
            
            // dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage })) ;
            toast.success("Profile Updated Successfully") ;
        }
        catch(err){
            console.log("UPDATE_PROFILE_API API ERROR............", err) ;
            toast.error("Could Not Update Profile") ;
        }

        toast.dismiss(toastId) ;
    }
}

export function changePassword(token, formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...") ;

        try{
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
                Authorization: `Bearer ${token}`,
            }) ;

            console.log("CHANGE_PASSWORD_API API RESPONSE............", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success(response.data.message) ;
        }
        catch(err){
            console.log("CHANGE PASSWORD API ERROR ---> ", err) ;
            toast.error(err.response.data.message) ;
        }

        toast.dismiss(toastId) ;
    }
}

export function deleteAccount(token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...") ;

        try{
            const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
                Authorization: `Bearer ${token}`,
            }) ;

            console.log("DELETE ACCOUNT API RESPONSE............", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success(response.data.message) ;
        }
        catch(err){
            console.log("DELETE ACCOUNT API ERROR ---> ", err) ;
            toast.error(err.response.data.message) ;
        }

        toast.dismiss(toastId) ;
    }
}