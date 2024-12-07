import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import CourseSubSectionAccordion from './CourseSubSectionAccordion';

const CourseAccordionBar = ({ section, handleActive, isActive }) => {

    const [active, setActive] = useState(false) ;
    const contentEle = useRef(null) ;

    useEffect(() => {
        setActive(isActive?.includes(section._id)) ;
    }, [isActive]) ;

    const [sectionHeight, setSectionHeight] = useState(0)
    useEffect(() => {
        setSectionHeight(active ? contentEle.current.scrollHeight : 0)
    }, [active]) ;  

    return (
        <div className='border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 text-lg'>
            
            <div onClick={() => handleActive(section._id)} className='flex items-center justify-between bg-opacity-20 cursor-pointer px-7 py-6 transition-[0.3s]'>
                <div className='flex gap-x-4 items-center justify-center'>
                    {/* down icon */}
                    <IoIosArrowDown className={` ${isActive.includes(section._id) ? "rotate-180 transition-all duration-200" : "rotate-0 transition-all duration-200" } `} />

                    <p>
                        {section?.sectionName}
                    </p>
                </div>

                <p className='text-yellow-25 text-base'>
                    {
                        section?.subSection.length > 1 ? section?.subSection.length + " lectures" : section?.subSection.length + " lecture"
                    }
                </p>
            </div>

            <div ref={contentEle} className='relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]' style={{ height: sectionHeight }}>
                        
                <div className='text-textHead flex flex-col gap-2 px-7 py-6 font-semibold'>
                    {
                        section?.subSection?.map((subSection, index) => (
                            <CourseSubSectionAccordion key={index} subSection={subSection} />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default CourseAccordionBar