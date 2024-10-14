import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS, TRUNCATE_LENGTH } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { fetchInstructorCourses, deleteCourse } from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { MdDeleteForever } from 'react-icons/md';
import { FaCheck, FaEdit } from "react-icons/fa";
import { HiClock } from "react-icons/hi";

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

    console.log("Instructor's Courses : ", courses) ;

    return (
        <div>
            <Table className='rounded-3xl border border-richblack-800'>
                <Thead>
                    <Tr className='flex gap-x-12 rounded-t-md border-b border-richblack-800 px-6 py-3'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-100'>
                            Courses
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Duration
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Price
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td  className='py-10 text-center text-2xl font-medium text-richblack-100'>
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) : (
                            courses?.map((course) => (
                                <Tr key={course._id} className='flex gap-x-12 border-b border-richblack-800 px-6 py-8'>

                                    <Td className='flex flex-1 gap-x-4'>
                                        <img src={course?.thumbnail} className='h-[150px] w-[220px] rounded-lg object-cover' loading='lazy' />

                                        <div className='flex flex-col items-start justify-start gap-y-4'>
                                            <p className='text-lg font-semibold text-richblack-5'>
                                                {course.courseName}
                                            </p>
                                            <p  className='text-xs text-richblack-300'>
                                                {
                                                    course.courseDescription.split(" ").length > TRUNCATE_LENGTH ? 
                                                    course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                                    : course.courseDescription
                                                }
                                            </p>
                                            <p className='text-xs text-white'>
                                                Created on : {course.createdAt.slice(0, 10)}
                                            </p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ? (
                                                    <p className="flex w-fit flex-row items-center justify-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                        <HiClock size={14} />
                                                        Drafted
                                                    </p>
                                                ) : (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                        <FaCheck size={8} />
                                                        </div>
                                                        Published
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </Td>

                                    <Td className='text-sm font-medium text-richblack-100'>
                                        2hr 30min
                                    </Td>

                                    <Td className='text-sm font-medium text-richblack-100'>
                                        ₹{course.price}
                                    </Td>

                                    <Td className='text-sm font-medium text-richblack-100'>
                                        <button disabled={loading} 
                                        onClick={() => {
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }} title='Edit' className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                                        >
                                            <FaEdit className='text-xl' />
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
                                        }} title='Delete' className='px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]'
                                        >
                                           <MdDeleteForever className='text-xl' />
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