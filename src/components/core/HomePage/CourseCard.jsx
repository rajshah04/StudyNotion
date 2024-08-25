import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { ImTree } from 'react-icons/im'

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
    return (
        <div className={` ${cardData.heading === currentCard ? "bg-white shadow-[10px_10px_rgba(255,214,10)]" : "bg-richblack-800"} w-[98%] h-[300px] lg:w-[300px] cursor-pointer flex flex-col justify-between`} onClick={() => setCurrentCard(cardData.heading)}>
            <div className='pt-8 px-6 pb-[52px] flex flex-col gap-5'>
                <h1 className={`${cardData.heading === currentCard ? "text-black" : ""} text-xl font-semibold`}>{cardData.heading}</h1>

                <p className='text-base text-richblack-400'>{cardData.description}</p>                
            </div>

            {/* <div className='w-full border border-pure-greys-700 border-dashed'></div> */}

            <div className={`${cardData.heading === currentCard ? "text-blue-500" : "text-richblack-400"} flex justify-between px-6 py-3 border-t-2 border-pure-greys-500 border-dashed text-base font-medium`}>
                <div className='flex justify-center items-center gap-2'>
                    <FaUsers />
                    {cardData.level}
                </div>

                <div className='flex justify-center items-center gap-2'>
                    <ImTree />
                    {cardData.lessonNumber} Lessons
                </div>
            </div>
        </div>
    )
}

export default CourseCard