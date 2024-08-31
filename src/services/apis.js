const BASE_URL = process.env.REACT_APP_BASE_URL ;

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// AUTH Endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
}