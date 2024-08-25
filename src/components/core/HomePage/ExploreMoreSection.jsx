import React, { useState } from 'react'
import HighlightText from './HighlightText';
import {HomePageExplore} from '../../../data/homepage-explore.js' ;
import CourseCard from './CourseCard.jsx';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
] ;

const ExploreMoreSection = () => {

    const [activeTab, setActiveTab] = useState(tabsName[0]) ;
    const [courses, setCourses] = useState(HomePageExplore[0].courses) ;
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading) ;


    const setMyCards = (value) => {
        setActiveTab(value) ;
        const result = HomePageExplore.filter((course) => course.tag === value) ;
        setCourses(result[0].courses) ;
        setCurrentCard(result[0].courses[0].heading) ;
    }


    return (
        <div className='w-[100%]'>
            <div className='flex flex-col lg:items-center'>

                {/* text section */}
                <div className='flex flex-col gap-3 text-left lg:text-center'>
                    <h1 className='font-semibold text-4xl'>
                        Unlock the <HighlightText text={" Power of Code"} /> 
                    </h1>

                    <p className='text-base text-richblack-300'>Learn to Build Anything You Can Imagine</p>
                </div>

                {/* tabs wala section */}
                <div className='my-8 p-1 hidden lg:flex justify-center items-center bg-richblack-800 border-richblack-600 border-b-2 rounded-full text-richblack-300 font-medium w-fit mx-auto'>
                    {
                        tabsName.map((ele, ind) => {
                            return (
                                <div className={`${activeTab === ele ? "bg-richblack-900 text-white border-white rounded-full " : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} key={ind} 
                                onClick={() => {
                                    setActiveTab(ele);
                                    setMyCards(ele)
                                } 
                                }>
                                    {ele}
                                </div>
                            ) ;
                        })
                    }
                </div>

                {/* <div className='lg:h-[150px]'></div> */}

                {/* Cards section */}
                <div className='flex flex-col lg:flex-row gap-10 translate-y-20'>
                    {
                        courses.map((ele, index) => {
                            return (
                                <CourseCard key={index} cardData={ele} currentCard={currentCard} setCurrentCard={setCurrentCard} />       
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExploreMoreSection