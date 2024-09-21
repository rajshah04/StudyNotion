import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../core/HomePage/Button';
import { useDispatch } from 'react-redux';
import { contactUs } from '../../services/operations/contactUsAPI';
import CountryCode from '../../data/countrycode.json' ;

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false) ;
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm() ;

    const dispatch = useDispatch() ;

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                firstName: "",
                lastName: "",
                email: "",
                phoneNo: "",
                // countryCode: "+91 - India",
                message: ""
            }) ;
        }
    }, [reset, isSubmitSuccessful]) ;

    const submitContactForm = async(data) => {
        console.log("Contact form data : ", data) ;
        
        dispatch(contactUs(data.firstName, data.lastName, data.email, data.phoneNo, data.countryCode, data.message)) ;
    }

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-8'>
            
            <div className='flex gap-6'>
                {/* firstName */}
                <div className='flex flex-col gap-2 w-full lg:w-[50%]'>
                    <label htmlFor='firstName' className='text-sm text-richblack-5'>First Name {" "}
                        <sup className='text-pink-300'>*</sup>
                    </label>
                    <input type='text' name='firstName' id='firstName' placeholder='Enter first name'
                    {...register("firstName", {required: true})} className='w-full rounded-xl bg-richblack-800 p-3 text-richblack-5 border-b-2 border-richblack-700' />
                    {
                        errors.firstName && (
                            <span className='text'>
                                Please enter first name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col gap-2 w-full lg:w-[50%]'>
                    <label htmlFor='lastName' className='text-sm text-richblack-5'>Last Name</label>
                    <input type='text' name='lastName' id='lastName' placeholder='Enter last name'
                    {...register("lastName")} className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 border-b-2 border-richblack-700' />
                </div>

            </div>
            
            {/* email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-sm text-richblack-5'>Email Address {" "}
                <sup className='text-pink-300'>*</sup>
                </label>
                <input type='email' name='email' id='email' placeholder='Enter email address'
                {...register("email", {required:true})} className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 border-b-2 border-richblack-700' />
                {
                    errors.email && (
                        <span>
                            Please enter email address
                        </span>
                    )
                }
            </div>

            {/* phone number */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='phoneNo' className='text-sm text-richblack-5'>Phone Number {" "}
                    <sup className='text-pink-300'>*</sup>
                </label>

                <div className='flex gap-5'>
                    <select name='dropdown' id='dropdown'
                    {...register("countryCode", {required:{value:true, message:"Please select country code"}})}
                    className='w-[130px] rounded-lg bg-richblack-800 p-3 text-richblack-5 border-b-2 border-richblack-700'>

                        {
                            CountryCode.map((ele, index) => {
                                return (
                                    <option key={index} value={ele.code} className='flex gap-x-10 justify-between'>
                                        <p>
                                            {ele.code}
                                        </p>
                                        {"  -  "}
                                        <p>
                                            {ele.country}
                                        </p>
                                          
                                    </option>
                                )
                            })
                        }

                    </select>

                    <input type='tel' name='phoneNo' id='phoneNo' placeholder='12345 67890'
                    {...register("phoneNo", 
                    {
                        required:{value:true, message: "Phone Number is required"},
                        maxLength:{value:10, message: "Invalid Phone Number"},
                        minLength:{value:10, message: "Invalid Phone Number"}
                    })} 
                    className='w-[calc(100%-30px)] rounded-lg bg-richblack-800 p-3 text-richblack-5 border-b-2 border-richblack-700' />

                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>

            {/* message */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-sm text-richblack-5'>Message {" "}
                <sup className='text-pink-300'>*</sup>
                </label>
                <textarea name='message' id='message' placeholder='Enter your message here' rows="7" cols="30"
                {...register("message", {required:true})} className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 border-b-2 border-richblack-700' />
                {
                    errors.message && (
                        <span>
                            Please enter your message
                        </span>
                    )
                }
            </div>
            
            <button type='submit' className='text-center text-[16px] px-6 py-3 rounded-md font-bold
                bg-yellow-50 text-black border-b-2 border-r-2 border-yellow-5'>
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm