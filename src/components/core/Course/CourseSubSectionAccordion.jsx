import React from 'react';
import { HiOutlineVideoCamera } from 'react-icons/hi';

const CourseSubSectionAccordion = ({ subSection }) => {
    return (
        <div className='flex justify-between py-2'>
            <div className='flex items-center gap-x-2'>
                <HiOutlineVideoCamera />

                <p>
                    {
                        subSection?.title
                    }
                </p>
            </div>
        </div>
    )
}

export default CourseSubSectionAccordion