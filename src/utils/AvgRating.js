const getAvgRating = (ratingArray) => {
    if(ratingArray?.length === 0) return 0 ;

    const totalRatingCount = ratingArray.reduce((acc, curr) => {
        acc += curr.rating ;
        return acc ;
    }, 0) ;

    const multiplier = Math.pow(10, 1) ;

    const avgReviewCount = Math.round((totalRatingCount / ratingArray.length) * multiplier) / multiplier ;

    return avgReviewCount ;
}

export default getAvgRating