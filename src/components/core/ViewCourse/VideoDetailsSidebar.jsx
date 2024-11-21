import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonBtn from '../../common/CommonBtn';
import { useParams } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState("") ;
    const [videoBarActive, setVideoBarActive] = useState("") ;

    const navigate = useNavigate() ;
    const location = useLocation() ;

    const { sectionId, subSectionId } = useParams() ;

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
            <div className='flex h-[calc(100vh-3.5rem)] w-[270px] max-w-[320px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                {/* for buttons and headings */}
                <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>
                    {/* for buttons */}
                    <div className='flex w-full items-center justify-between'>
                        <div onClick={() => navigate("/dashboard/enrolled-courses")} className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 cursor-pointer' title='Back'>
                            <IoChevronBackOutline size={35} />
                        </div>

                        <div>
                            <CommonBtn text="Add Review" onclick={() => setReviewModal(true)} />
                        </div>
                    </div>

                    {/* for heading */}
                    <div className='flex flex-col'>
                        <p>
                            {courseEntireData?.courseName}
                        </p>

                        <p className='text-richblack-500 font-semibold text-sm'>
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                {/* sections and subsections */}
                <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>
                    {
                        courseSectionData.map((section, index) => (
                            <div onClick={() => setActiveStatus(section?._id)} key={index} className='mt-2 cursor-pointer text-sm text-richblack-5' >

                                {/* section */}
                                <div className='flex flex-row justify-between items-center bg-richblack-600 px-5 py-4'>
                                    <div className='w-[70%] font-semibold'>
                                        {section?.sectionName}
                                    </div>

                                    {/* add arrow icon here and handle rotate logic */}
                                    <span className={`${activeStatus === section?._id ? "rotate-180" : "rotate-0"} duration-500 transition-all`}>
                                        <MdOutlineArrowDropDown size={25} />
                                    </span>
                                </div>

                                {/* subSections */}
                                <div>
                                    {
                                        activeStatus === section?._id  && (
                                            <div className='transition-[height] duration-500 ease-in-out'>
                                                {
                                                    section.subSection.map((topic, index) => (
                                                        <div className={`flex gap-4 p-4 ${videoBarActive === topic._id ? "bg-yellow-100 text-richblack-800 font-semibold" : "hover:bg-richblack-900"}`} key={index} 
                                                        onClick={() =>{
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic?._id}`) ;

                                                            setVideoBarActive(topic?._id) ;
                                                        }} >
                                                            <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => {}} />
                                                                
                                                            {topic.title}                                                            
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