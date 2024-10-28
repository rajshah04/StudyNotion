import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const CourseDetails = () => {

    const { token } = useSelector((state) => state.auth) ;
    const { user } = useSelector((state) => state.profile) ;
    const { courseId } = useParams() ;
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const buyCourseHandler = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch) ;
            return ;
        }
        else{
            toast.error("Please login or signup first.") ;
        }
    }

    return (
        <div className='flex items-center'>
            <button onClick={buyCourseHandler} className='bg-yellow-50 p-6 mt-10'>
                Buy Now
            </button>
        </div>
    )
}

export default CourseDetails