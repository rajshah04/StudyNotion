import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import getAvgRating from '../utils/AvgRating';
import Error from '../pages/Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import dateFormatter from '../utils/dateFormatter';
import { GrLanguage } from 'react-icons/gr';
import { CgInfo } from 'react-icons/cg';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';

const CourseDetails = () => {

    const { token } = useSelector((state) => state.auth) ;
    const { user } = useSelector((state) => state.profile) ;
    const { loading } = useSelector((state) => state.profile) ;
    const { paymentLoading } = useSelector((state) => state.course) ;
    const { courseId } = useParams() ;
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const [courseData, setCourseData] = useState(null) ;
    const [confirmationModal, setConfirmationModal] = useState(null) ;
    const [date, setDate] = useState("") ;
    const [isActive, setIsActive] = useState([]) ;

    const handleActive = (id) => {
        setIsActive(!isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e != id)) ;
    }

    useEffect(() => {
        const getFullCourseDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId) ;

                setCourseData(result) ;
                console.log("Course data result : ", result) ;
            }   
            catch(err){
                console.log("Could not fetch course details : ", err) ;
            }
        }

        getFullCourseDetails() ;
        // console.log("Course data : ", courseData) ;
    }, [courseId]) ;

    const [avgReviewCount, setAvgReviewCount] = useState(0) ;

    useEffect(() => {
        const count = getAvgRating(courseData?.courseDetails?.ratingAndReviews) ;

        setAvgReviewCount(count) ;

        const fetchDate = dateFormatter(courseData?.courseDetails?.createdAt) ;

        setDate(fetchDate) ;
    }, [courseData]) ;

    const [totalLectures, setTotalLectures] = useState(0) ;

    useEffect(() => {
        let lectures = 0 ;
        courseData?.courseDetails?.courseContent?.forEach((section) =>{
            lectures += section.subSection.length || 0 ;
        })

        setTotalLectures(lectures) ;
    }, [courseData]) ;

    const buyCourseHandler = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch) ;
            return ;
        }
        
        setConfirmationModal({
            text1: "You are not logged in.",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        }) ;
    }

    if(loading || !courseData){
        return (
            <div className='w-full h-[75vh] grid place-items-center'>
                <div className='custom-loader'></div>
            </div>
        )
    }

    if(!courseData.success){
        return <Error />
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt
    } = courseData.courseDetails ;

    const {
        image,
        firstName,
        lastName,
        additionalDetails
    } = instructor ;

    const {
        about
    } = additionalDetails ;

    return (
        <div className='flex flex-col gap-4 text-white'>
            
            {/* <div className='bg-richblack-800'> */}
            <div className='bg-richblack-800 flex flex-col'>
            
                <div className='relative flex flex-col justify-center w-11/12 my-20 py-10 mx-auto max-w-maxContent text-lg gap-6 text-richblack-5'>
                    <p className='text-4xl text-richblack-5 font-bold sm:text-[42px]'>
                        {courseName}
                    </p>

                    <p className='text-richblack-200'>
                        {courseDescription}
                    </p>

                    <div className='flex flex-wrap font-medium gap-2'>
                        
                        <span className='text-yellow-25'>
                            {avgReviewCount}
                        </span>

                        <RatingStars reviewCount={avgReviewCount} starSize={24} />

                        <span>
                            {`${ratingAndReviews.length} reviews`}
                        </span>

                        <span>
                            {`${studentsEnrolled.length} students enrolled`}
                        </span>
                    </div>

                    <div>
                        <p>
                            Created By {`${instructor.firstName} ${instructor.lastName}`}
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-6 text-lg'>
                        
                        <p className='flex justify-center items-center gap-3'>
                            <CgInfo />
                            Created At : {date}
                        </p>

                        <p className='flex gap-x-2 items-center'>
                            {/* add icon here */}
                            <GrLanguage />
                            
                            <span>
                                English
                            </span>
                        </p>
                    </div>
                {/* </div> */}

            {/* </div> */}

                    <div className='absolute right-0 top-0 z-30 min-h-[600px] max-w-[410px]'>
                        <CourseDetailsCard course={courseData.courseDetails} setConfirmationModal={setConfirmationModal} buyCourseHandler={buyCourseHandler} />
                    </div>

                </div>

            </div>

            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>

                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>

                    <div className='my-8 border border-richblack-600 p-8'>
                        <p className='text-3xl font-semibold'>
                            What You Will Learn
                        </p>

                        <div className='mt-5'>
                            {whatYouWillLearn}
                        </div>
                    </div>

                    <div className='max-w-[830px]'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-3xl font-semibold'>
                                Course Content
                            </p>
                        

                            <div className='flex flex-wrap gap-4 justify-between'> 
                                <div className='flex gap-4'>
                                    <span>
                                        {courseContent.length} section(s)
                                    </span>

                                    <span>
                                        {totalLectures} lectures
                                    </span>

                                    <span>
                                        {courseData.totalDuration} total duration
                                    </span>
                                </div>
                                
                                <div>
                                    {
                                        isActive?.length !== 0 && (
                                            <button onClick={() => setIsActive([])} className='text-yellow-25'>
                                                Collapse all sections
                                            </button>
                                        )
                                    }

                                    {
                                        isActive?.length === 0 && (
                                            <button onClick={() => setIsActive(courseContent?.map((section) => section._id))} className='text-yellow-25'>
                                                Expand all sections
                                            </button>
                                        )
                                    }
                                </div>

                            </div>
                        </div>

                        {/* add section-subsection details here */}
                        <div className='my-4'>
                            {
                                courseContent?.map((section, index) => {
                                    return <CourseAccordionBar key={index} section={section} handleActive={handleActive} isActive={isActive} />
                                })
                            }
                        </div>


                        {/* instructor's details */}
                        <div className='mb-12 py-4'>
                            <p className='text-3xl font-semibold'>
                                Instructor
                            </p>

                            <div className='flex items-center gap-6 my-4 py-4'>
                                <img src={image} className='h-16 w-16 rounded-full object-cover' />

                                <p className='text-lg'>
                                    {firstName} {lastName}
                                </p>

                            </div>
                            
                            <p className='text-lg'>
                                {about}
                            </p>
                        </div>
                    </div>

                </div>

                {/* course reviews */}
                <h2 className='text-left lg:text-center font-semibold text-4xl'>
                    Reviews from other learners
                </h2>

                <ReviewSlider courseRelatedRating={true} />
            </div>

            
            <Footer />

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}

export default CourseDetails