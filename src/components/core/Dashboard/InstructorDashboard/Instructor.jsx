import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {

    const { token } = useSelector((state) => state.auth) ;
    const { user } = useSelector((state) => state.profile) ;

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

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0) ;
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0) ;

    return (
        <div className='text-richblack-5'>
            <div>
                <h1 className='font-bold text-3xl mb-4'>
                    Hi {user?.firstName}👋
                </h1>

                <p className='text-sm text-richblack-300 my-4 font-medium'>
                    Let's start something new
                </p>
            </div>

            {
                loading ? 
                (<div className='grid place-items-center w-full min-h-full'>
                    <div className='chart-loader' >      

                    </div>    
                </div>)
                : courses.length > 0
                ? (
                    <div>

                        <div className='my-4 flex min-h-fit space-x-4'>
                            {totalAmount > 0 || totalStudents > 0 ? (
                                <div className='w-[75%] rounded-md bg-richblack-800 p-6'>
                                    <InstructorChart courses={instructorData} />
                                </div>
                            ) : (
                                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                    <p className="text-xl font-semibold">
                                        Visualize
                                    </p>
                                    <p className="mt-4 text-xl font-medium0">
                                        Not Enough Data To Visualize
                                    </p>
                                </div>
                            )}

                            <div className='w-[25%] flex flex-col items-start p-6 gap-y-4 rounded-md bg-richblack-800'>
                                <p className='text-xl font-semibold'>
                                    Statistics
                                </p>

                                <div className='space-y-1'>
                                    <p className='text-lg text-richblack-300'>
                                        Total Courses
                                    </p>
                                    <p className='text-2xl text-richblack-5 font-bold'>
                                        {courses.length}
                                    </p>
                                </div>

                                <div className='space-y-1'>
                                    <p className='text-lg text-richblack-300'>
                                        Total Students
                                    </p>
                                    <p className='text-2xl text-richblack-5 font-bold'>
                                        {totalStudents}
                                    </p>
                                </div>

                                <div className='space-y-1'>
                                    <p className='text-lg text-richblack-300'>
                                        Total Income
                                    </p>
                                    <p className='text-2xl text-richblack-5 font-bold'>
                                        Rs. {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </div>    

                        <div className='bg-richblack-800 rounded-md p-6'>
                            {/* render 3 courses */}
                            <div className='flex justify-between'>
                                <p className='text-xl font-semibold'>
                                    Your Courses
                                </p>

                                <Link to="/dashboard/my-courses">
                                    <p className='text-sm font-semibold text-yellow-50'>
                                        View all
                                    </p>
                                </Link>
                            </div>

                            <div className='flex items-start space-x-6 my-4'>
                                {
                                    courses.slice(0, 3).map((course) => (
                                        <div key={course._id} className='w-[33%]'>
                                            <img src={course.thumbnail} alt="" className='h-[201px] w-full rounded-md object-cover' />

                                            <div className='mt-3 w-full'>
                                                <p className='text-sm font-medium text-richblack-50'>
                                                    {course.courseName}
                                                </p>

                                                <div className='mt-1 flex items-center space-x-2'>
                                                    <p className='text-xs font-medium text-richblack-300'>
                                                        {
                                                            course.studentsEnrolled.length > 1
                                                            ? (
                                                                <p>
                                                                    {course.studentsEnrolled.length} Students Enrolled
                                                                </p>
                                                            )
                                                            : (
                                                                <p>
                                                                    {course.studentsEnrolled.length} Student Enrolled
                                                                </p>
                                                            )
                                                        } 
                                                    </p>

                                                    <p className='text-xs font-medium text-richblack-300'>
                                                        |
                                                    </p>

                                                    <p className='text-xs font-medium text-richblack-300'>
                                                        {
                                                            course.price === 0 
                                                            ? (
                                                                <p>
                                                                    Free
                                                                </p>
                                                            ) 
                                                            : (
                                                                <p>
                                                                    Rs. {course.price}
                                                                </p>
                                                            ) 
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className='mt-20 rounded-md bg-richblack-800 p-6 py-20'>
                        <p className='text-center text-2xl font-bold'>
                            You have not created any courses yet
                        </p>

                        <Link to={"/dashboard/add-course"}>
                            <p className='mt-1 text-center text-lg font-semibold text-yellow-50'>
                                Create a Course
                            </p>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default Instructor