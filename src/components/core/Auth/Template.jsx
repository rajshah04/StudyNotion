import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import frame from '../../../assets/Images/frame.png';


const Template = ({title, description1, description2, img, formType}) => {
  return (
    <div className='mx-auto flex flex-col-reverse md:flex-row md:gap-y-0 md:gap-x-12 w-11/12 max-w-maxContent justify-between gap-y-12 py-12 my-8'>
        
        {/* left div - text and form */}
        <div className='mx-auto w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 text-3xl leading-[38px] font-semibold mb-4'>{title}</h1>

            <p className='text-lg text-richblack-100 font-normal'>
                {description1}{" "}
                <span className='font-edu-sa text-blue-100 text-base font-semibold'>{description2}</span>
            </p>

            {
                formType === "login" ? <LoginForm /> : <SignupForm />
            }
        </div>

        {/* right div - image and bg*/}
        <div className='relative mx-auto my-4 w-11/12 max-w-[450px]'>
            <img src={frame} alt='frame' width={558} height={504} loading='lazy' />
            <img src={img} alt="" width={558} height={504} loading='lazy' className='absolute -top-4 -left-4' />
        </div>
    </div>
  )
}

export default Template