import React from 'react';
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from '../assets/Images/aboutus1.webp' ;
import BannerImage2 from '../assets/Images/aboutus2.webp' ;
import BannerImage3 from '../assets/Images/aboutus3.webp' ;
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png';
import Stats from '../components/core/AboutPage/Stats';
import LearningGridSection from '../components/core/AboutPage/LearningGridSection';
import Footer from '../components/common/Footer';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';
import ReviewSlider from '../components/common/ReviewSlider';

const About = () => {
  return (
    <div>

        <section className="bg-richblack-800">
            <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-richblack-5">

                <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                    Driving Innovation in Online Education for a
                    <HighlightText text={" Brighter Future"} />
                    <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                    Studynotion is at the forefront of driving innovation in online
                    education. We're passionate about creating a brighter future by
                    offering cutting-edge courses, leveraging emerging technologies,
                    and nurturing a vibrant learning community.
                    </p>
                </header>

                <div className="sm:h-[70px] lg:h-[150px]"></div>

                <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                    <img src={BannerImage1} alt="" loading='lazy' />
                    <img src={BannerImage2} alt="" loading='lazy' />
                    <img src={BannerImage3} alt="" loading='lazy' />
                </div>
            </div>
        </section>

        <section className='border-b border-richblack-800'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-10 text-richblack-500'>

                <div className='h-32'></div>
                <Quote />
                <div className='h-16'></div>

            </div>
        </section>

        <section>
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-6 text-richblack-500'>
                
                <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                    <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                        <h1 className='text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text'>
                            Our Founding Story
                        </h1>

                        <p className='font-medium text-richblack-300'>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='font-medium text-richblack-300'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>

                    <div className=' lg:w-[50%]'>
                        <img src={FoundingStory} alt='foundingStory' loading='lazy' className="shadow-[0_0_20px_0] shadow-[#FD1D1D]" />
                    </div>
                </div>

                <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                    <div className='my-10 flex lg:w-[50%] flex-col gap-10'>
                        <h1 className='text-4xl font-semibold bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>
                            Our Vision
                        </h1>

                        <p className='font-medium text-richblack-300'>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    
                    </div>

                    <div className='my-10 flex lg:w-[50%] flex-col gap-10'>
                        <h1 className='text-4xl font-semibold bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>
                            Our Mission
                        </h1>

                        <p className='font-medium text-richblack-300'>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    
                    </div>
                </div>
            
            </div>
        </section>

        <Stats />
        
        <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between items-center gap-10 text-richblack-5">
            <LearningGridSection />
            <ContactFormSection />
        </section>

        <section className="w-11/12 max-w-maxContent mx-auto">
            <h1 className='font-semibold text-4xl text-richblack-5 text-center my-8'>
                Reviews from other learners
            </h1>

            <ReviewSlider />
        </section>

        <Footer />    

    </div>
  )
}

export default About