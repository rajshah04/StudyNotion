import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { useParams, Outlet } from 'react-router-dom';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const { token } = useSelector((state) => state.auth) ;
    const [reviewModal, setReviewModal] = useState(false) ;
    const { courseId } = useParams() ;

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

        setCourseSpecificDetails() ;
    }, []) ;


    return (
        <div>
           <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                    <div className='mx-6'>
                        <Outlet /> 
                    </div>
                </div>
            </div>

            {/* {<CourseReviewModal setReviewModal={setReviewModal} />}  */}
            {
                reviewModal && (
                    <CourseReviewModal setReviewModal={setReviewModal} />
                )
            } 
        </div>
    )
}

export default ViewCourse