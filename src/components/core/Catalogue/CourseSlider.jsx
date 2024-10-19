import React from 'react';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import Course_Card from './Course_Card';

const CourseSlider = ({Courses}) => {

    return (
        <div>
            {
                Courses?.length === 0 ? (
                    <p className='text-xl text-richblack-5'>
                        No Course Found
                    </p>
                ) : (
                    <Swiper slidesPerView={1}  spaceBetween={25} loop={true} pagination={true} modules={[Autoplay, FreeMode, Pagination, Navigation]}
                    breakpoints={{
                      1024: {
                        slidesPerView: 3,
                        // slidesPerView: 1,
                      },
                    }} 
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}
                    navigation={true}
                    className='max-h-[30rem]' >
                        {
                            Courses?.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <Course_Card course={course} Height={'h-[250px]'} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
            }
        </div>
    ) 
}

export default CourseSlider