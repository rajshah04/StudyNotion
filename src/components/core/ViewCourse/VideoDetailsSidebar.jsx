import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../common/CommonBtn';
import { useParams } from 'react-router-dom';

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState("") ;
    const [videoBarActive, setVideoBarActive] = useState("") ;

    const navigate = useNavigate() ;
    const location = useLocation() ;

    const { sectionId, subSectionId} = useParams() ;

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse) ;
    
    useEffect(() => {
        const setActiveFlags = () => {
            if(!courseSectionData.length){
                return ;
            }

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId) ;

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id ;

            // setting current section & subsection
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id) ;
            setVideoBarActive(activeSubSectionId) ;
        }

        setActiveFlags() ;
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div>
                {/* for buttons and headings */}
                <div>
                    {/* for buttons */}
                    <div>
                        <div onClick={() => navigate("/dashboard/enrolled-courses")}>
                            {/* add icon */}
                            Back

                        </div>

                        <div>
                            <CommonBtn text="Add Review" onclick={() => setReviewModal(true)} />
                        </div>
                    </div>

                    {/* for heading */}
                    <div>
                        <p>
                            {courseEntireData?.courseName}
                        </p>

                        <p>
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                {/* sections and subsections */}
                <div>
                    {
                        courseSectionData.map((section, index) => (
                            <div onClick={() => setActiveStatus(section?._id)} key={index} >

                                {/* section */}
                                <div>
                                    <div>
                                        {section?.sectionName}
                                    </div>

                                    {/* add arrow icon here and handle rotate logic */}
                                </div>

                                {/* subSections */}
                                <div>
                                    {
                                        activeStatus === section?._id  && (
                                            <div>
                                                {
                                                    section.subSection.map((topic, index) => (
                                                        <div className={`flex gap-4 p-4 ${videoBarActive === topic._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-richblack-5"}`} key={index} 
                                                        onClick={() =>{
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic?._id}`) ;

                                                            setVideoBarActive(topic?._id) ;
                                                        }} >
                                                            <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => {}} />

                                                            <span>
                                                                {topic.title}
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default VideoDetailsSidebar