import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {countryCode} from '../../../data/countrycode.json';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendotp, signup } from '../../../services/operations/authAPI';
// import { setSignupData } from '../../../slices/authSlice';

const SignupForm = () => {
    const [countryCode, setCountryCode] = useState("+91") ;
    const [showPassword, setShowPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: "",
        confirmPassword: ""
    }) ;

    const [accountType, setAccountType] = useState("Student") ;

    const {firstName, lastName, email, phoneNo, password, confirmPassword} = formData ;

    const changeHandler = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        })) ;
    }

    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, navigate)) ;

        // dispatch(setSignupData(formData)) ;
        dispatch(sendotp(formData.email, navigate)) ;
    }

    // console.log(accountType) ;
    // console.log(formData) ;

    return (
        <form className='mt-6 flex w-full flex-col gap-y-4' onSubmit={submitHandler}>

            <div className='my-2 p-1 hidden lg:flex justify-center items-center bg-richblack-800 border-richblack-600 border-b-2 rounded-full text-richblack-300 font-medium w-fit'>
                <h1 className={`${accountType === "Student" ? "bg-richblack-900 text-white border-white rounded-full" : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setAccountType("Student")}>Student</h1>
                <h1 className={`${accountType === "Instructor" ? "bg-richblack-900 text-white border-white rounded-full" : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setAccountType("Instructor")}>Instructor</h1>
            </div>

            {/* Name div */}
            <div className='flex flex-col md:flex-row gap-6'>
                <label className='w-full relative'>
                    <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                        First Name <sub className='text-pink-200 text-lg'>*</sub>
                    </p>
                    
                    <input required type="text" name='firstName' value={firstName} 
                    placeholder='Enter first name' 
                    className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 tracking-wide border-b-2 border-richblack-700' 
                    onChange={changeHandler}/>
                    
                </label>

                <label className='w-full relative'>
                    <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                        Last Name <sub className='text-pink-200 text-lg'>*</sub>
                    </p>
                    
                    <input required type="text" name='lastName' value={lastName} 
                    placeholder='Enter last name' 
                    className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 tracking-wide border-b-2 border-richblack-700' 
                    onChange={changeHandler}/>
                </label>
            </div>

            {/* email address */}
            <label className='w-full'>
                <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                    Email Address <sub className='text-pink-200 text-lg '>*</sub>
                </p>
                
                <input required type='text' name='email' value={email} 
                placeholder='Enter email address' 
                // style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 border-b-2  border-richblack-700' 
                onChange={changeHandler}/>
            </label>

            {/* phone number */}
            {/* <div className='flex flex-col md:flex-row gap-6'>
                <label className='w-full relative'>
                    <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                        Phone Number <sub className='text-pink-200 text-lg'>*</sub>
                    </p>

                    <option>
                        {
                            countryCode.map(() => ({
                                return (
                                    <select>

                                    </select>
                                )
                            }))
                        }
                    </option>
                    
                    <input required type="tel" name='phoneNo' value={phoneNo} 
                    placeholder='1234567890' 
                    className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 tracking-wide border-b-2 border-richblack-700' 
                    onChange={changeHandler}/>
                    
                </label>
            </div> */}

            {/* Passwords div */}
            <div className='flex flex-col md:flex-row gap-6'>
                <label className='w-full relative'>
                    <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                        Create Password <sub className='text-pink-200 text-lg'>*</sub>
                    </p>
                    
                    <input required type={`${showPassword ? "text" : "password"}`} name='password' value={password} 
                    placeholder='Enter password' 
                    className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 tracking-wide border-b-2 border-richblack-700' 
                    onChange={changeHandler}/>
                    <span className='absolute' onClick={() => setShowPassword((prev) => (!prev))}>
                        {
                            showPassword ? 
                            (<AiOutlineEyeInvisible className='cursor-pointer text-2xl -translate-x-10 translate-y-3' fill='#AFB2BF' />) 
                            : (<AiOutlineEye className='cursor-pointer text-2xl -translate-x-10 translate-y-3' fill='#AFB2BF' />)
                        }
                    </span>
                    
                </label>

                <label className='w-full relative'>
                    <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                        Confirm Password <sub className='text-pink-200 text-lg'>*</sub>
                    </p>
                    
                    <input required type={`${showConfirmPassword ? "text" : "password"}`} name='confirmPassword' value={confirmPassword} 
                    placeholder='Confirm password' 
                    className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5 tracking-wide border-b-2 border-richblack-700' 
                    onChange={changeHandler}/>
                    <span className='absolute' onClick={() => setShowConfirmPassword((prev) => (!prev))}>
                        {
                            showConfirmPassword ? 
                            (<AiOutlineEyeInvisible className='cursor-pointer text-2xl -translate-x-10 translate-y-3' fill='#AFB2BF' />) 
                            : (<AiOutlineEye className='cursor-pointer text-2xl -translate-x-10 translate-y-3' fill='#AFB2BF' />)
                        }
                    </span>
                </label>
            </div>      

            <button type='submit' className='bg-yellow-50 border-b-2 border-yellow-5 text-center text-base font-medium text-richblack-900 rounded-lg py-2 px-3 mt-6 hover:scale-95 transition-all duration-200'>
                Create Account
            </button>

        </form>
    )
}

export default SignupForm