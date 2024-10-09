import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { fetchInstructorCourses, deleteCourse } from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CoursesTable = ({courses, setCourses}) => {

    const { token } = useSelector((state) => state.auth) ;
    // const { course } = useSelector((state) => state.course) ;
    const dispatch = useDispatch() ;

    const [loading, setLoading] = useState(false) ;
    const [confirmationModal, setConfirmationModal] = useState(null) ;

    const navigate = useNavigate() ;

    useEffect(() => {
        const getCourses = async() => {
            setLoading(true) ;

            const result = await fetchInstructorCourses(token) ;

            console.log("Result : ", result) ;

            if(result){
                setCourses(result) ;
            }

            setConfirmationModal(null) ;
            setLoading(false) ;
        }

        // add more to this
        getCourses() ;
    }, [])

    const handleCourseDelete = async(courseId) => {
        setLoading(true) ;

        await deleteCourse({courseId: courseId}, token) ;

        const result = await fetchInstructorCourses(token) ;

        console.log("Result : ", result) ;

        if(result){
            setCourses(result) ;
        }

        setConfirmationModal(null) ;
        setLoading(false) ;
    }

    return (
        <div>
            <Table>
                <Thead>
                    <Tr className='flex gap-x-12 border-richblack-800 p-8'>
                        <Th>
                            Courses
                        </Th>
                        <Th>
                            Duration
                        </Th>
                        <Th>
                            Price
                        </Th>
                        <Th>
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) : (
                            courses?.map((course) => (
                                <Tr key={course._id} className='flex gap-x-12 border-richblack-800 p-8'>

                                    <Td className='flex gap-x-4' rowspan='1'>
                                        <img src={course?.thumbnail} className='h-[150px] w-[220px] rounded-lg object-cover' loading='lazy' />

                                        <div className='flex flex-col'>
                                            <p>
                                                {course.courseName}
                                            </p>
                                            <p>
                                                {course.courseDescription}
                                            </p>
                                            <p>
                                                Created :
                                            </p>
                                            {
                                                // course.status === COURSE_STATUS.DRAFT ? (
                                                    // add icon
                                                    <p className='text-red-400'>
                                                        DRAFTED
                                                    </p>
                                                // ) : (
                                                //     // add icon
                                                //     <p className='text-yellow-50'>
                                                //         PUBLISHED
                                                //     </p>
                                                // )
                                            }
                                        </div>
                                    </Td>

                                    <Td rowspan='1'>
                                        2hr 30min
                                    </Td>

                                    <Td>
                                        {course.price}
                                    </Td>

                                    <Td>
                                        <button disabled={loading} 
                                        onClick={() => {
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }}
                                        >
                                            {/* add icon */}
                                            Edit
                                        </button>
                                        
                                        <button disabled={loading} 
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course ?",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                btn2Handler: !loading ? () =>setConfirmationModal(null) : () => {},
                                            })
                                        }}
                                        >
                                            {/* add icon */}
                                           Delete
                                        </button>
                                    </Td>

                                </Tr>
                            ))
                        )
                    }
                </Tbody>

            </Table>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}

export default CoursesTable