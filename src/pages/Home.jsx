import React from 'react' ;
import { Link } from 'react-router-dom' ;
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4" ;
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import TimeLineSection from '../components/core/HomePage/TimeLineSection' ;
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent text-white items-center justify-between'>

            <Link to={"/signup"} >
                <div className='group mt-16 p-1 mx-auto bg-richblack-800 font-bold text-richblack-200 rounded-full transition-all duration-200 hover:scale-95 w-fit border-b-2 border-richblack-700 hover:border-0'>
                    <div className='flex flex-row items-center gap-3 px-6 py-[5px] rounded-full transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />    
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                {/* <h1>Empower Your Future with <span className=''>Coding Skills</span></h1> */}
                <h1>Empower Your Future with <HighlightText text="Coding Skills" /></h1>
            </div>

            <div className='mt-7 text-center w-[90%] text-richblack-300 text-lg font-bold'>
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
            </div>

            <div className='flex flex-row items-center gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            {/* video */}
            <div className='mx-6 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className="shadow-[25px_25px_rgba(255,255,255)]" autoPlay muted loop>
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

        </div>
        
        
        {/* Section 2 */}
        
        
        {/* Section 3 */}
        
        
        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Home ;