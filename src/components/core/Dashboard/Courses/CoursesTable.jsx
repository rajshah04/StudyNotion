import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { COURSE_STATUS, TRUNCATE_LENGTH } from '../../../../utils/constants';
import { FaCircleInfo } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({ courses, loading }) => {

    const navigate = useNavigate() ;

    return (
        <div>
            <Table className='rounded-3xl'>
                <Thead>
                    <Tr className='flex gap-x-12 rounded-t-md border border-richblack-500 bg-richblack-500 text-richblack-5 px-6 py-3'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase'>
                            Courses
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase -translate-x-8'>
                            Author
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase'>
                            Price
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase'>
                            Action
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        !loading ? (
                            courses.length === 0 ? (
                                <Tr>
                                    <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                                        No Courses Found.
                                    </Td>
                                </Tr>
                            ) : 
                            (
                                courses.map((course, index, array) => (
                                    <Tr key={course._id} className={`flex gap-x-12 border border-richblack-700 ${index === array.length - 1 ? "rounded-b-md" : ""} px-6 py-8 hover:border-richblack-300`}>

                                        <Td className='flex flex-1 flex-col md:flex-row gap-x-4'>
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
                                                            <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                                <FaCheck size={8} />
                                                            </p>
                                                            Published
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </Td>

                                        <Td className='text-sm font-medium text-richblack-100 flex gap-3 items-center justify-center'>
                                            <img src={course.instructor.image} alt="" className='w-10 h-10 rounded-full' />

                                            <p>
                                                {course.instructor.firstName} {course.instructor.lastName}
                                            </p>
                                        </Td>

                                        <Td className='text-sm font-medium text-richblack-100 flex items-center justify-center'>
                                            ₹{course.price}
                                        </Td>

                                        <Td className='text-sm font-medium text-richblack-100 flex items-center justify-center'>
                                            <button disabled={loading} title='Info page' className='px-2 transition-all duration-200 hover:scale-110 hover:text-yellow-100' onClick={() => navigate(`course/${course._id}`)}
                                            >
                                                <FaCircleInfo className='text-lg'/>
                                            </button>   
                                            
                                            <button disabled={loading} title='Go To' className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300' onClick={() => navigate(`/courses/${course._id}`)}
                                            >
                                                <FaArrowRight className='text-lg'/>
                                            </button>   
                                        </Td>

                                    </Tr>
                                ))
                            )
                        ) :
                        (
                            <div className='h-[80vh] w-full grid place-items-center'>
                                <div className='custom-loader'>
                    
                                </div>
                            </div>
                        )
                    }
                </Tbody>
            </Table>
        </div>
    )
}

export default CoursesTable