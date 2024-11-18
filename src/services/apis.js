const BASE_URL = process.env.REACT_APP_BASE_URL ;

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// CATALOGUE PAGE DATA
export const catalogueData = {
    CATALOGUE_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

// AUTH Endpoints
export const authEndpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// CONTACT FORM Endpoints
export const contactEndpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
    REMOVE_PROFILE_PICTURE_API: BASE_URL + "/profile/removeProfilePicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteAccount",
}

// PROFILE Endpoints
export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}

// COURSE Endpoints
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// STUDENT ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessfulEmail"
}

// RATING AND REVIEW ENDPOINTS
export const ratingAndReviewEndpoints = {
    GET_ALL_RATING: BASE_URL + "/course/getAllRating",
    GET_COURSE_RELATED_RATING: BASE_URL + "/course/getCourseRelatedRating",
    GET_COURSE_AVERAGE_RATING: BASE_URL + "/course/getAverageRating"
}