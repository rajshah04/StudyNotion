const getInstructorTotalReviews = (courses) => {
    if(!courses || courses?.length === 0) return 0 ;

    const totalReviewCount = courses.reduce((acc, curr) => {
        acc += curr.ratingAndReviews.length ;
        return acc ;
    }, 0) ;

    return totalReviewCount ;
}

export default getInstructorTotalReviews