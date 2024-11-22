import React from 'react';
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import ContactForm from '../components/ContactPage/ContactForm';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';



const info = [
    {
        emoji: <HiChatBubbleLeftRight className='text-richblack-100' size={25} /> ,
        title: "Chat on us",
        para1: "Our friendly team is here to help.",
        para2: "@mail address"
    },
    {
        emoji: <FaLocationDot className='text-richblack-100' size={25} /> ,
        title: "Visit us",
        para1: "Come and say hello at our office HQ.",
        para2: "Address"
    },
    {
        emoji: <IoCallSharp className='text-richblack-100' size={25} /> ,
        title: "Call us",
        para1: "Mon - Fri From 8am to 5pm",
        para2: "+123 456 7890"
    },
] ;

const Contact = () => {
  return (
    <div className="mt-14 flex flex-col">

        <div className='w-11/12 max-w-maxContent mx-auto '>
            <div className='flex flex-col-reverse md:flex-row justify-between items-start gap-14 text-richblack-5'>
                {/* left section */}
                <div className='bg-richblack-800 lg:w-[40%] rounded-xl p-8 flex flex-col gap-6'>
                    {
                        info.map((ele, ind) => {
                            return (
                                <div key={ind} className='flex gap-4'>
                                    <div>
                                        {ele.emoji}
                                    </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-richblack-5 text-lg font-semibold'>{ele.title}</h1>

                                        <p className='text-richblack-200 text-sm font-medium'>{ele.para1}</p>
                                        <p className='text-richblack-200 text-base font-semibold'>{ele.para2}</p>
                                    </div>

                                    
                                </div>
                            )
                        })
                    }
                </div>

                {/* right form */}
                <div className='lg:w-[60%]'>
                    <ContactForm />
                </div>
            </div>

            <div>
                <h1 className='font-semibold text-4xl text-richblack-5 text-center my-8'>
                    Reviews from other learners
                </h1>

                <ReviewSlider />
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default Contact