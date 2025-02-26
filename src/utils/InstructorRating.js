const getInstructorRating = (courses) => {
    if(!courses || courses?.length === 0) return 0 ;

    let totalRating = 0;
    let totalCoursesWithRatings = 0;

    courses.forEach(course => {
        if(course.ratingAndReviews.length > 0){
            const courseRatingSum = course.ratingAndReviews.reduce((sum, rating) => sum + rating.rating, 0);
            const courseRatingAvg = courseRatingSum / course.ratingAndReviews.length;
            totalRating += courseRatingAvg;
            totalCoursesWithRatings++;
        }
    });

    const instructorRating = totalCoursesWithRatings > 0 ? (totalRating / totalCoursesWithRatings).toFixed(1) : 0;

    return instructorRating ;
}

export default getInstructorRating