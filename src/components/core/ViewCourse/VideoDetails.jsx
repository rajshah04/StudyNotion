import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import CommonBtn from '../../common/CommonBtn';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';



const VideoDetails = () => {

  const { token } = useSelector((state) => state.auth) ;
  const { courseSectionData, coursEntireData, completedLectures } = useSelector((state) => state.viewCourse) ;

  const [videoData, setVideoData] = useState([]) ;
  const [videoEnded, setVideoEnded] = useState(false) ;
  const [loading, setLoading] = useState(false) ;

  const { courseId, sectionId, subSectionId } = useParams() ;

  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  const videoPlayerRef = useRef(null) ;
  const location = useLocation() ;

  useEffect(() => {
    const setVideoSpecificDetails = async() => {
      if(!courseSectionData.length){
        return ;
      }

      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses") ;
      }
      else{
        // assuming all 3 fields are present
        const filteredData = courseSectionData.filter((course) => course._id === sectionId) ;

        const filteredVideoData = filteredData?.[0].subSection.filter((data) => data._id === subSectionId) ;

        setVideoData(filteredVideoData[0]) ;
        setVideoEnded(false) ;
      }
    }

    setVideoSpecificDetails() ;
  }, [courseSectionData, coursEntireData, location.pathname]) ;


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId) ;

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true ;
    }
    else {
      return false ;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length ;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId) ;

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1){
      return true ;
    }
    else {
      return false ;
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length ;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId) ;

    if(currentSubSectionIndex !== noOfSubSections - 1){
      // same section's next video
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id ;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`) ;
    }
    else {
      // different/next section's first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id ;

      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id ;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`) ;
    }
  }

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length ;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId) ;

    if(currentSubSectionIndex !== 0){
      // same section's previous video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id ;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`) ;
    }
    else{
      // previous section's last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id ;

      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length ;

      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id ;

      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`) ;
    }
  }

  const handleLectureCompletion = async() => {
    setLoading(true) ;

    const response = await markLectureAsComplete({courseId, subSectionId}, token) ;

    // update the state
    if(response){
      dispatch(updateCompletedLectures(subSectionId)) ;
    }

    setLoading(false) ;
  }

  const handleRewatchVideo = () => {
    if(videoPlayerRef?.current){
      videoPlayerRef.current?.seek(0) ;
      setVideoEnded(false) ;
    }
  }

  return (
    <div className='flex flex-col gap-5 text-white'>
      {
        !videoData ? (
          <div>
            No Data Found
          </div>
        ) : (
          <Player ref={videoPlayerRef} aspectRatio='16:9' playsInline onEnded={() => setVideoEnded(true)} src={videoData?.videoUrl} height={`50vh`}>

            {/* add play button icon */}

            {
              videoEnded && (
                <div>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <CommonBtn disabled={loading} onclick={() => handleLectureCompletion()} text={!loading ? "Mark As Completed" : "Loading..."} customClasses={"text-xl max-w-max px-4 mx-auto"} />
                    )
                  }

                  <CommonBtn disabled={loading} onclick={() => handleRewatchVideo()} text={"Rewatch"} customClasses={"text-xl max-w-max px-4 mx-auto mt-2"} />

                  
                  <div>
                    {!isFirstVideo() && (
                      <button disabled={loading} onClick={goToPreviousVideo} className='bg-richblack-800 px-5 py-2 font-semibold text-richblack-5 rounded-md cursor-pointer'>
                        Previous
                      </button>
                    )}

                    {!isLastVideo() && (
                      <button disabled={loading} onClick={goToNextVideo} className='bg-richblack-800 px-5 py-2 font-semibold text-richblack-5 rounded-md cursor-pointer'>
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )
            }

          </Player>
        )
      }

      <h1 className='mt-4 text-3xl font-semibold'>
        {videoData?.title}
      </h1>

      <p className='pt-2 pb-6'>
        {videoData?.description}
      </p>

    </div>
  )
}

export default VideoDetails