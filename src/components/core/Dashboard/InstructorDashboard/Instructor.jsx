import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from '../../../../services/operations/profileAPI';

const Instructor = () => {

    const { token } = useSelector((state) => state.auth) ;

    const [loading, setLoading] = useState(false) ;
    const [instructorData, setInstructorData] = useState(null) ;
    const [courses, setCourses] = useState([]) ;

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true) ;

            const instructorApiData = await getInstructorData(token) ;
            
            const result = await fetchInstructorCourses(token) ;
            
            console.log("Instructor's Courses Data : ",  instructorApiData) ;

            if(instructorApiData.length){
                setInstructorData(instructorApiData) ;
            }

            if(result){
                setCourses(result) ;
            }

            setLoading(false) ;
        }

        getCourseDataWithStats() ;
    }, []) ;

    return (
        <div>
            
        </div>
    )
}

export default Instructor