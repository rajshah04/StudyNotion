import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import CommonBtn from '../../../common/CommonBtn';
import CoursesTable from '../InstructorCourses/CoursesTable';

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth) ;
    const navigate = useNavigate() ;
    const [courses, setCourses] = useState([]) ;

    // useEffect(() => {
    //     const fetchCourses = async() => {
    //         const result = await fetchInstructorCourses(token) ;

    //         if(result){
    //         setCourses(result) ;
    //         }
    //     }

    //     fetchCourses() ;
    // }, []) ;
    

    return (
        <div>
            
            <div className='flex justify-between items-center'>
                <h1>
                    My Courses
                </h1>

                <CommonBtn text="Add Course" children={"Add + icon"} onclick={() => navigate("/dashboard/add-course")} />                
            </div>

            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} />
            }

        </div>
    )
}

export default MyCourses