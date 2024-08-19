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

            {/* Code Section 1 */}
            <div>
                {/* TODO -- done : try making 2 different codes to display in the section */}
                <CodeBlocks 
                position={"lg:flex-row"} 
                heading={<h1 className='text-white font-semibold text-4xl'>Unlock your <HighlightText text={"coding potential"} /> with our online courses. </h1>} 
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        text: "Try it Yourself",
                        linkto: "/login",
                        active: true
                    }
                }
                ctabtn2={
                    {
                        text: "Learn More",
                        linkto: "/signup",
                        active: false
                    }
                } 
                
                codeblock={
                    `<!DOCTYPE html> \n<html>\n <head>\n <title>My First Webpage</title>\n <link rel="stylesheet" href="styles.css">\n </head>\n <body>\n <h1> <a href="/"> Header </a>\n </h1>\n <nav><a href="one/"> One </a> <a href="two/"> Two </a> <a href="three/"> Three </a> \n </nav>\n </body>\n </html> `
                } 
                codeColor={`text-yellow-25`}
                backgroundGradient={<div className='codeblock1 absolute'> </div>}
                />

                {/* Code Section 2 */}

                <CodeBlocks 
                position={"lg:flex-row-reverse"} 
                heading={<h1 className='text-white font-semibold text-4xl'>Start <HighlightText text={"coding in seconds."} /></h1>} 
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        text: "Continue Lesson",
                        linkto: "/login",
                        active: true
                    }
                }
                ctabtn2={
                    {
                        text: "Learn More",
                        linkto: "/signup",
                        active: false
                    }
                } 
                
                codeblock={
                    `import React from "react" ;
                    import { FaArrowRight } from "react-icons/fa" ;
                    
                    const Home = () => {

                    return (
                            <div className="flex justify-center items-center">
                            <h1> Learn React </h1>
                            <FaArrowRight />
                            </div>
                        ) ;
                    }

                    export default Home ;`
                } 
                codeColor={`text-white`}
                backgroundGradient={<div className='codeblock2 absolute'> </div>}
                />
            </div>

        </div>

        {/* Section 2 */}
        <div className="bg-pure-greys-5 text-richblack-700">
            <div className="homepage_bg h-[320px]">
                {/* Explore Full Catagory Section */}
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                    <div className="lg:h-[150px]"></div>
                    <div className="flex flex-row gap-7 text-white lg:mt-8">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-2">
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                {/* Job that is in Demand - Section 1 */}
                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className="text-4xl font-semibold lg:w-[45%] ">
                        Get the skills you need for a{" "}
                        <HighlightText text={"job that is in demand."} />
                    </div>

                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. Today, to
                            be a competitive specialist requires more than professional
                            skills.
                        </div>

                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="">Learn More</div>
                        </CTAButton>
                    </div>
                </div>

                {/* Timeline Section - Section 2 */}
                <TimeLineSection />

                {/* Learning Language Section - Section 3 */}
                <LearningLanguageSection />
            </div>
        </div>
        
        {/* Section 3 */}
        
        
        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Home ;