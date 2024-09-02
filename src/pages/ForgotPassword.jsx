import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false) ;
    const [email, setEmail] = useState("") ;
    const loading = useSelector( (state) => state.auth) ;
    const dispatch = useDispatch() ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(getPasswordResetToken(email, setEmailSent)) ;
    }

    return (
        <div className='flex justify-center items-center mx-auto h-[90vh] text-richblack-5 w-96'>
            {
                loading ?
                (
                    <div>
                        Loading...
                    </div>
                ) :
                (
                    <div className='flex flex-col gap-3 text-base'>
                        <h1 className='text-richblack-5 text-3xl font-semibold'>
                            {
                                emailSent ? 
                                "Check email" :
                                "Reset your password"
                            }
                        </h1>

                        <p className='text-richblack-300 text-lg font-normal'>
                            {
                                emailSent ?
                                `We have sent the password reset email to ${email}.` :
                                "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery."
                            }
                        </p>

                        <form onSubmit={(e) => submitHandler(e)} className='flex flex-col'>
                            {
                                !emailSent && (
                                    <label className='text-richblack-300'>
                                        <p className='my-2'>Email Address {" "}
                                            <sup className='text-pink-200' >*</sup>
                                        </p>
                                        <input required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' className='px-4 py-2 rounded-md bg-richblack-800 border-b-2 border-richblack-700 min-w-full' />
                                    </label>
                                )
                            }

                            <button type='submit' className='bg-yellow-100 text-richblack-900 border-b-2 border-r-2 border-yellow-25 rounded-md px-4 py-2 mt-6 font-medium'>
                                {
                                    emailSent ? "Resend Email"
                                    : "Reset Password"
                                }
                            </button>
                        </form>

                        <div>
                            <Link to="/login" className='flex items-center text-base gap-2 text-richblack-5'>
                                <MdArrowBack />
                                Back to Login   
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword