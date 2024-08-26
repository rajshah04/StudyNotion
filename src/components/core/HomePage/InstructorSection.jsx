import React from 'react' ;
import image from '../../../assets/Images/Instructor.png' ;
import HighlightText from './HighlightText';
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';

const InstructorSection = () => {
  return (
    <div>
        
        {/* photo and text div */}
        <div className='flex flex-col-reverse lg:flex-row justify-center items-center gap-20 my-20'>
            {/* <div className='min-w-[45%]'> */}
            <div className='lg:w-[50%] lg:order-1 order-2'>
                <img src={image} className='h-[550px] lg:shadow-[-25px_-25px_rgba(255,255,255)]' />

                <div className='lg:hidden mt-14 block w-fit'>
                    <Button active={true} linkto={"/signup"} >
                        <p className='flex justify-center items-center gap-3'>
                            Start Teaching Today <FaArrowRight />
                        </p>
                    </Button>
                </div>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-y-12 order-2 lg:order-2'>
                <div className='text-3xl font-semibold'>
                    <p>Become an</p>
                    <HighlightText text={"Instructor"} />
                </div>

                <p className='text-richblack-300 text-base'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                <div className='hidden lg:block w-fit translate-y-2'>
                    <Button active={true} linkto={"/signup"} >
                        <p className='flex justify-center items-center gap-3'>
                            Start Teaching Today <FaArrowRight />
                        </p>
                    </Button>
                </div>
            </div>

            

        </div>

    </div>
  )
}

export default InstructorSection