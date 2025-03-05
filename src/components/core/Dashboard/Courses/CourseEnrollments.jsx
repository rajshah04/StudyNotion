import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCourseDetails } from '../../../../services/operations/adminAPI';
import { useParams } from 'react-router-dom';

const CourseEnrollments = () => {

    const { token } = useSelector((state) => state.auth) ;

    const { courseId } = useParams() ;

    useEffect(() => {
        const fetchCourseDetails = async() => {

            const response = await getCourseDetails(token, { courseId }) ;

            console.log("Response : ", response) ;
        }

        fetchCourseDetails() ;
    }, []) ;

    return (
        <div>
            {/* course information */}


            {/* students enrolled table */}
        </div>
    )
}

export default CourseEnrollments