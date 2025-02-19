import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { useParams, Outlet } from 'react-router-dom';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { getUserCourseRelatedRating } from '../services/operations/ratingReviewsAPI';

const ViewCourse = () => {

    const { token } = useSelector((state) => state.auth) ;
    const [reviewModal, setReviewModal] = useState(false) ;
    const { courseId } = useParams() ;

    const [courseAlreadyReviewed, setCourseAlreadyReviewed] = useState(false) ;

    const dispatch = useDispatch() ;

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token) ;
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent)) ;
            dispatch(setCourseEntireData(courseData.courseDetails)) ;
            dispatch(setCompletedLectures(courseData.completedVideos)) ;

            let lectures = 0 ;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length ;
            })
            dispatch(setTotalNoOfLectures(lectures)) ;
        }

        const courseReviewedOrNot = async() => {
        
            const response = await getUserCourseRelatedRating(courseId, token) ;

            if(response.review){
                setCourseAlreadyReviewed(true) ;
            }
        }

        courseReviewedOrNot() ;

        setCourseSpecificDetails() ;
    }, []) ;


    return (
        <div>
           <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} courseAlreadyReviewed={courseAlreadyReviewed} setCourseAlreadyReviewed={setCourseAlreadyReviewed} />

                <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                    <div className='mx-6'>
                        <Outlet /> 
                    </div>
                </div>
            </div>

            {/* {<CourseReviewModal setReviewModal={setReviewModal} />}  */}
            {
                reviewModal && (
                    <CourseReviewModal setReviewModal={setReviewModal} setCourseAlreadyReviewed={setCourseAlreadyReviewed} />
                )
            } 
        </div>
    )
}

export default ViewCourse