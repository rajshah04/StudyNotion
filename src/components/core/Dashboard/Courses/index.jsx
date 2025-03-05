import React, { useEffect, useState } from 'react';
import CoursesTable from './CoursesTable';
import { useSelector } from 'react-redux';
import { getCourses } from '../../../../services/operations/adminAPI';

const Courses = () => {

    const { token } = useSelector((state) => state.auth) ;
    const [courses, setCourses] = useState([]) ;
    const [courseType, setCourseType] = useState("All") ;
    const [loading, setLoading] = useState(false) ;

    useEffect(() => {
        
        const fetchCourses = async() => {
            setLoading(true) ;

            const response = await getCourses(token, {courseType}) ;
            setCourses(response) ;

            setLoading(false) ;
        }

        fetchCourses() ;

    }, [courseType]) ;


    return (
        <div>
            <div className='mb-6 flex justify-between items-center'>
                <h1 className='text-3xl font-medium text-richblack-5'>
                    Courses
                </h1>
            </div>   

            {/* 3 options */}
            <div className='my-4 p-1 flex justify-center items-center bg-richblack-800 border-richblack-600 border-b-2 rounded-full text-richblack-300 font-medium w-fit'>
                <p className={`${courseType === "All" ? "bg-richblack-900 text-white border-white rounded-full " : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setCourseType("All")}>
                    All
                </p>

                <p className={`${courseType === "Published" ? "bg-richblack-900 text-white border-white rounded-full " : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setCourseType("Published")}>
                    Published
                </p>

                <p className={`${courseType === "Drafted" ? "bg-richblack-900 text-white border-white rounded-full " : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setCourseType("Drafted")}>
                    Drafted
                </p>
            </div>

            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} loading={loading} />
            }        
        </div>
    )
}

export default Courses