import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInstructorData } from '../services/operations/profileAPI';
import getTotalStudents from '../utils/TotalStudents';
import getInstructorTotalReviews from '../utils/InstructorReviews';
import Course_Card from '../components/core/Catalogue/Course_Card';
import getInstructorRating from '../utils/InstructorRating';

const InstructorDetails = () => {

    const [instructorDetails, setInstructorDetails] = useState() ;
    const [loading, setLoading] = useState(false) ;
    const { instructorName } = useParams() ;

    const [totalStudents, setTotalStudents] = useState(0) ;
    const [totalReviews, setTotalReviews] = useState(0) ;
    const [instructorRating, setInstructorRating] = useState(0) ;

    useEffect(() => {

        console.log("Instructor's name : ", instructorName)

        const fetchInstructorDetails = async() => {
            setLoading(true) ;

            const result = await getInstructorData(instructorName) ;
            console.log("Instructor details : ", result) ;

            setInstructorDetails(result) ;

            setLoading(false) ;
        }

        fetchInstructorDetails() ;
    }, []) ;

    useEffect(() => {
        const totalStudents = getTotalStudents(instructorDetails?.courses) ;

        setTotalStudents(totalStudents) ;

        const totalReviews = getInstructorTotalReviews(instructorDetails?.courses) ;

        setTotalReviews(totalReviews) ;

        const fetchInstructorRating = getInstructorRating(instructorDetails?.courses) ;

        setInstructorRating(fetchInstructorRating) ;
    }, [instructorDetails]) ;

    if(loading){
        return (
            <div className='h-[80vh] w-full grid place-items-center'>
                <div className='custom-loader'>
        
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='relative mx-auto flex justify-center items-center flex-col-reverse md:flex-row md:items-start w-11/12 max-w-maxContent text-white py-8 gap-8'>
                {/* left section - instructor's information */}
                <div className='flex flex-col w-[70%]'>
                    <p className='uppercase text-richblack-200'>
                        Instructor
                    </p>

                    <p className='pb-6 text-5xl font-playfair'>
                        {instructorDetails?.firstName} {instructorDetails?.lastName}
                    </p>

                    {/* div for instructor rating, students and reviews */}
                    <div className='flex gap-8'>
                        {/* instructor rating */}
                        <div className='gap-2'>
                            <p className='font-semibold text-richblack-300'>
                                Instructor Rating
                            </p>

                            <p className='text-center'>
                                {instructorRating || 0}
                            </p>
                        </div>
                        
                        {/* students */}
                        <div className='gap-2'>
                            <p className='font-semibold text-richblack-300'>
                                Total Students
                            </p>

                            <p className='text-center'>
                                {totalStudents || 0}
                            </p>
                        </div>

                        {/* reviews */}
                        <div className='gap-2'>
                            <p className='font-semibold text-richblack-300'>
                                Total Reviews
                            </p>

                            <p className='text-center'>
                                {totalReviews || 0}
                            </p>
                        </div>
                    </div>

                    {/* instructor's details */}
                    <div className='mt-10'>
                        <p className='text-lg font-semibold mb-6'>
                            About me
                        </p>

                        <p>
                            {instructorDetails?.additionalDetails?.about}
                        </p>
                    </div>

                    {/* my courses section */}
                    <div className='mt-10'>
                        <p className='text-lg font-semibold mb-6'>
                            My courses ({`${instructorDetails?.courses?.length || 0}`})
                        </p>

                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                            {
                                instructorDetails?.courses?.map((course, index) => (
                                    <Course_Card course={course} Height={`h-[200px]`} key={index} />
                                ))
                            }    
                        </div>    

                    </div>

                </div>

                {/* right section - image */}
                <div>
                    <img className='h-52 rounded-full' src={instructorDetails?.image} alt="Instructor's image" />
                </div>
            </div>
        </div>
    )
}

export default InstructorDetails