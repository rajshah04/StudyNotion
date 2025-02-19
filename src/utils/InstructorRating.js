import getAvgRating from "./AvgRating";

const getInstructorRating = (courses) => {
    if(!courses || courses?.length === 0) return 0 ;

    // TODO : check whether the below logic is working for all cases or not
    const totalRating = courses.reduce((acc, course) => {

        const courseRating = getAvgRating(course.ratingAndReviews) ;

        acc += courseRating ;

        return acc ;
    }, 0) ;

    const avgRating = totalRating / courses.length ;

    return avgRating ;
}

export default getInstructorRating