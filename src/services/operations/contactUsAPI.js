import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector";
import { contactEndpoints } from "../apis";

const { CONTACT_US_API } = contactEndpoints ;


export function contactUs(firstName, lastName, email, phoneNo="", countryCode = "", message){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...") ;
        dispatch(setLoading(true)) ;

        try{
            const response = await apiConnector("POST", CONTACT_US_API, {
                firstName,
                lastName,
                email,
                phoneNo,
                countryCode,
                message
            }) ;

            console.log("Response of sending contact form data ---> ", response) ;

            if(!response.data.success){
                throw new Error(response.data.message) ;
            }

            toast.success("Message Sent.") ;
        }
        catch(err){
            console.log("Error in sending message of contact form ---> ", err) ;
            toast.error("Message not sent.") ;
        }

        dispatch(setLoading(false)) ;
        toast.dismiss(toastId) ;
    }
}