import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import CommonBtn from '../../../common/CommonBtn';
import CoursesTable from '../InstructorCourses/CoursesTable';
import { FiPlusCircle } from 'react-icons/fi';

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth) ;
    const navigate = useNavigate() ;
    const [courses, setCourses] = useState([]) ;    

    return (
        <div>
            
            <div className='mb-14 flex justify-between items-center'>
                <h1 className='text-3xl font-medium text-richblack-5'>
                    My Courses
                </h1>

                <CommonBtn text="Add Course" children={<FiPlusCircle />} onclick={() => navigate("/dashboard/add-course")} />                
            </div>

            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} />
            }

        </div>
    )
}

export default MyCourses