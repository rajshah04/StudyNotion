import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCourseDetails } from '../../../../services/operations/adminAPI';
import { useParams } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import ProgressBar from '@ramonak/react-progress-bar';

const CourseEnrollments = () => {

    const { token } = useSelector((state) => state.auth) ;
    const { courseId } = useParams() ;
    const [courseDetails, setCourseDetails] = useState([]) ;

    useEffect(() => {
        const fetchCourseDetails = async() => {

            const response = await getCourseDetails(token, { courseId }) ;
            setCourseDetails(response) ;

            console.log("Response : ", response) ;
        }

        fetchCourseDetails() ;
    }, []) ;

    const {
        studentsEnrolled,
    } = courseDetails ;

    return (
        <div>
            <p className='text-richblack-5 text-3xl my-8'>
                Course Enrollments
            </p>

            {/* students enrolled table */}
            <Table className='rounded-3xl'>
                <Thead>
                    <Tr className='flex gap-x-12 rounded-t-md border border-richblack-500 px-6 py-3 text-richblack-5 bg-richblack-500'>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            Student
                        </Th>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            Email
                        </Th>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            Completed Course (%)
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        (studentsEnrolled?.length ?? 0) === 0 ? (
                            <Tr>
                                <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                                    No Students Enrolled Yet.
                                </Td>
                            </Tr>
                        ) : (
                            studentsEnrolled.map((student, index, array) => (
                                <Tr key={student._id} className={`flex gap-x-12 border border-richblack-700 ${index === array.length - 1 ? "rounded-b-md" : ""} px-6 py-6 cursor-pointer hover:border-richblack-300 items-center`}>
                                    <Td className='flex flex-1 justify-start items-center gap-x-4'>

                                        <img src={student.image} alt="" className='w-10 rounded-full' />

                                        <div className='flex flex-col items-start justify-start gap-y-4'>
                                            <p className='text-lg font-semibold text-richblack-5'>
                                                {student.firstName} {student.lastName}
                                            </p>
                                        </div>

                                    </Td>

                                    <Td className='flex-1 font-medium text-richblack-100 translate-x-2'>
                                        {
                                            student.email
                                        }
                                    </Td>

                                    <Td className='flex-1 font-medium text-richblack-100'>
                                        <ProgressBar completed={student.progressPercentage || 0} height='15px'  width='360px' />
                                    </Td>
                                </Tr>
                            ))
                        )
                    }
                </Tbody>
            </Table>
        </div>
    )
}

export default CourseEnrollments