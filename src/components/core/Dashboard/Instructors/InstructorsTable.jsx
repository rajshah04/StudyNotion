import React, { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import { getAllInstructorsData } from '../../../../services/operations/adminAPI';
import { useSelector } from 'react-redux';
import getInstructorRating from '../../../../utils/InstructorRating';
import { FaArrowRight } from "react-icons/fa";
import { FaCircleInfo } from 'react-icons/fa6';

const InstructorsTable = ({ instructors, setInstructors }) => {

    const { token } = useSelector((state) => state.auth) ;

    const [loading, setLoading] = useState(false) ;
    const navigate = useNavigate() ;

    useEffect(() => {
        // function to fetch all instructors from the backend
        const fetchAllInstructors = async() => {
            setLoading(true) ;

            const response = await getAllInstructorsData(token) ;
            console.log("All Instructors : ", response) ;

            setInstructors(response) ;

            setLoading(false) ;
        }

        fetchAllInstructors() ;
    }, []) ;

    return (
        <div>
            <Table className='rounded-3xl'>
                <Thead>
                    <Tr className='flex gap-x-12 rounded-t-md border border-richblack-500 px-6 py-3 text-richblack-5 bg-richblack-500'>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            Instructors
                        </Th>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            Instructor's Rating
                        </Th>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            No. of Courses
                        </Th>
                        <Th className='flex-auto text-left text-sm font-medium uppercase'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        instructors.length === 0 ? (
                            <Tr>
                                <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                                    No Instructors Found
                                </Td>
                            </Tr>
                        ) : (
                            instructors.map((instructor, index, array) => (
                                <Tr key={instructor._id} className={`flex gap-x-12 border border-richblack-700 ${index === array.length - 1 ? "rounded-b-md" : ""} px-6 py-6 cursor-pointer hover:border-richblack-300 items-center`}>
                                    <Td className='flex flex-1 justify-start items-center gap-x-4'>

                                        <img src={instructor.image} alt="" className='w-10 rounded-full' />

                                        <div className='flex flex-col items-start justify-start gap-y-4'>
                                            <p className='text-lg font-semibold text-richblack-5'>
                                                {instructor.firstName} {instructor.lastName}
                                            </p>
                                        </div>

                                    </Td>

                                    <Td className='flex-1 font-medium text-richblack-100 translate-x-14'>
                                        {
                                            getInstructorRating(instructor?.courses)
                                        }
                                    </Td>

                                    <Td className='flex-1 font-medium text-richblack-100 translate-x-16'>
                                        {
                                            instructor.courses.length || 0
                                        }
                                    </Td>

                                    <Td className='flex-1 font-medium text-richblack-100 translate-x-12'>
                                        <button disabled={loading} title='Instructor Information' className='px-2 transition-all duration-200 hover:scale-110 hover:text-yellow-100' onClick={() => {navigate(`/instructor/${instructor.firstName.toLowerCase()}-${instructor.lastName.toLowerCase()}`)}}
                                        >
                                            <FaCircleInfo className='text-lg'/>
                                        </button>  
                                        
                                        <button disabled={loading} title='Instructor Dashboard' className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300' onClick={() => navigate(`${instructor._id}/instructor-dashboard`)}
                                        >
                                            <FaArrowRight className='text-lg'/>
                                        </button>  
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

export default InstructorsTable