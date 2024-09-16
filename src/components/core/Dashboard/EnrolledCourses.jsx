import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth) ;
    const [enrolledCourses, setEnrolledCourses] = useState(null) ;

    const getEnrolledCourses = async() => {
        try{
            // function call to api to get enrolled courses details
            // const response = await 
            // setEnrolledCourses(response) ;
        }catch(err){
            console.log("Error in fetching enrolled courses", err) ;
        }
    }

    useEffect(() => {
        getEnrolledCourses() ;
    },[])

    return (
        <div>
            
            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div className='w-full h-[75vh] grid place-items-center'>
                        <div className='custom-loader' />
                    </div>
                ) : !enrolledCourses.length ? (
                    <p>
                        You have not enrolled in any course yet
                    </p>
                ) : (
                    <div>   
                        <div>
                            <p>
                                Course Name
                            </p>
                            <p>
                                Duration
                            </p>
                            <p>
                                Progress
                            </p>
                        </div>

                        {/* Course cards */}
                        {
                            enrolledCourses.map((course, index) => (
                                <div>
                                    <div>
                                        <img src={course.thumbnail} alt={course?.courseName} />

                                        <div>
                                            <p>
                                                {course.courseName}
                                            </p>
                                            <p>
                                                {course.courseName}
                                            </p>CourseDecription
                                        </div>
                                    </div>

                                    <div>
                                        {course?.totalDuration}
                                    </div>

                                    <div>
                                        <p>
                                            Progress: {course.progressPercentage || 0}%
                                        </p>

                                        <ProgressBar completed={course.progressPercentage || 0} height='8px' isLabelVisible={false} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
}

export default EnrolledCourses