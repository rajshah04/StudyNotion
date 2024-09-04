import React from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';    
import { FaClockRotateLeft } from 'react-icons/fa6';
import { sendotp, signup } from '../services/operations/authAPI';


const VerifyEmail = () => {
    const { signupData, loading } = useSelector( (state) => state.auth) ;

    const [otp, setOtp] = useState("") ;
    
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        const {
            accountType, firstName, lastName, email, password, confirmPassword
        } = signupData ;

        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate)) ;

        console.log("Inside submit handler") ;
    }

    const resendOTPHandler = () => {
        dispatch(sendotp(signupData.email)) ;
    }

    console.log("OTP : ", otp) ;

    return (
        <div className='flex justify-center items-center mx-auto h-[90vh] text-richblack-5 w-96'>  
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) 
                : (
                    <div className='flex flex-col gap-3 text-base'>
                        <h1 className='text-richblack-5 text-3xl font-semibold'>
                            Verify email
                        </h1>

                        <p className='text-richblack-300 text-lg font-normal'>
                            A verification code has been sent to you. Enter the code below.
                        </p>

                        <form onSubmit={(e) => submitHandler(e)} className='flex flex-col'>
                            <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className='text-richblack-800'>{"---"}</span>}
                            renderInput={(props) => <input {...props}  className='bg-richblack-800 min-w-[56px] h-14 rounded-md border-b-2 border-b-richblack-700 text-2xl'/>} />

                            <button type='submit' className='bg-yellow-100 text-richblack-900 border-b-2 border-r-2 border-yellow-25 rounded-md px-4 py-2 mt-6 font-medium'>
                                Verify Email
                            </button>
                        </form>

                        <div className='flex justify-between'>
                            <Link to="/login" className='flex items-center text-base gap-2 text-richblack-5'>
                                <MdArrowBack />
                                Back to Login   
                            </Link>

                            <button onClick={() => resendOTPHandler()} className='flex justify-center items-center gap-2 text-blue-100'>
                                <FaClockRotateLeft />
                                Resend email
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail