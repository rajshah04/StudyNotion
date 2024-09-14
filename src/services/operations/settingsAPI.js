import toast from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";



const {UPDATE_PROFILE_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_ACCOUNT_API} = settingsEndpoints ;

// export function updateProfilePicture (){

// }

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