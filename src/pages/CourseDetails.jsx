import React from 'react';
import { useSelector } from 'react-redux';

const CourseDetails = () => {

    const { token } = useSelector((state) => state.auth) ;


    const buyCourseHandler = () => {
        if(token){
            
            return ;
        }
    }

    return (
        <div className='flex items-center'>
            <button onClick={() => buyCourseHandler()} className='bg-yellow-50 p-6 mt-10'>
                Buy Now
            </button>
        </div>
    )
}

export default CourseDetails