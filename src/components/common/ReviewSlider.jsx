import React, { useState, useEffect } from 'react';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import ReactStars from 'react-rating-stars-component';
import { getAllRatings, getCourseRelatedRatings } from '../../services/operations/ratingReviewsAPI';
import { TRUNCATE_WORDS } from '../../utils/constants';
import { useParams } from 'react-router-dom';


const ReviewSlider = ({ courseRelatedRating }) => {

    const [reviews, setReviews] = useState([]) ;
    const [loading, setLoading] = useState(false) ;

    const { courseId } = useParams() ;
    
    useEffect(() => {
        const fetchAllReviews = async() => {
            setLoading(true) ;
            
            const response = await getAllRatings() ;
            console.log("All Reviews : ", response) ;

            setReviews(response) ;
            
            setLoading(false) ;
        }

        const fetchCourseRelatedRatings = async() => {
            setLoading(true) ;
            
            console.log("Course id : ", courseId) ;
            const response = await getCourseRelatedRatings(courseId) ;
                        
            console.log("Course related Rating and Reviews : ", response) ;

            setReviews(response) ;
            
            setLoading(false) ;
        }

        if(courseRelatedRating)
            fetchCourseRelatedRatings() ;
        else
            fetchAllReviews() ; 

    }, []) ;

    useEffect(() => {
        console.log("Reviews : ", reviews) ;
    }, [reviews]) ;

    return (
        <div className='text-richblack-5'>
            <div className='h-[190px] my-[50px] max-w-maxContentTab lg:max-w-maxContent'>
                <Swiper slidesPerView={4} spaceBetween={24} loop={true} freeMode={true} autoplay={{delay: 2500, disableOnInteraction: false}} modules={[FreeMode, Pagination, Autoplay, Navigation]} className='w-full'>

                    {
                        reviews?.map((review, index) => (
                            <SwiperSlide key={index} >
                                <div className='flex flex-col gap-3 bg-richblack-800 p-6 text-[14px] text-richblack-25'>
                                    <div className='flex items-center gap-4'>

                                        <img src={review?.user?.image} alt={`${review?.user?.firstName}'s profile`} className='h-10 w-10 object-cover rounded-full' />

                                        <div className='flex flex-col'>
                                            <p className='font-semibold'>
                                                {review?.user?.firstName} {review?.user?.lastName}
                                            </p>

                                            <p className='text-xs font-medium text-richblack-500'>
                                                {review?.course?.courseName}
                                            </p>
                                        </div>
                                    </div>

                                    <p className='font-medium text-richblack-25'>
                                        {
                                            review?.review.split(" ").length > TRUNCATE_WORDS 
                                            ?
                                            `${review.review.split(" ").slice(0, TRUNCATE_WORDS).join(" ")} ...`
                                            :
                                            `${review.review}`
                                        }
                                    </p>

                                    <div className='flex items-end gap-x-3'>
                                        <ReactStars 
                                            count={5}
                                            edit={false} 
                                            value={review.rating}
                                            size={20} 
                                            isHalf={true}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />

                                        <p className='font-semibold text-yellow-100 text-[17px]'>
                                            {review?.rating}
                                        </p>                                
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider