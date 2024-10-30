import React, { useEffect, useState } from 'react';
import { VscStarEmpty, VscStarFull, VscStarHalf } from 'react-icons/vsc';

const RatingStars = ({reviewCount, starSize}) => {

    const [starCount, setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0
    }) ;

    useEffect(() => {
        const fullStars = Math.floor(reviewCount) || 0 ;
        const halfStars = Number.isInteger(reviewCount) ? 0 : 1 ;
        const emptyStars = Number.isInteger(reviewCount) ? 5 - fullStars : 4 - fullStars ;

        setStarCount({full: fullStars, half: halfStars, empty: emptyStars}) ;  
    }, [reviewCount]) ;

    return (
        <div className='text-yellow-100 flex gap-1'>
            {
                [...new Array(starCount.full)].map((_, index) => (
                    <VscStarFull key={index} size={starSize || 20} />
                ))
            }

            {
                [...new Array(starCount.half)].map((_, index) => (
                    <VscStarHalf key={index} size={starSize || 20} />
                ))
            }

            {
                [...new Array(starCount.empty)].map((_, index) => (
                    <VscStarEmpty key={index} size={starSize || 20} />
                ))
            }
        </div>
    )
}

export default RatingStars