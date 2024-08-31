import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false) ;
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }) ;

    const [accountType, setAccountType] = useState("Student") ;

    const {email, password} = formData ;

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
        dispatch(login(email, password, navigate)) ;
    }

    // console.log(accountType) ;
    // console.log(formData) ;

    return (
        <form className='mt-6 flex w-full flex-col gap-y-4' onSubmit={submitHandler}>

            <div className='my-2 p-1 hidden lg:flex justify-center items-center bg-richblack-800 border-richblack-600 border-b-2 rounded-full text-richblack-300 font-medium w-fit'>
                <h1 className={`${accountType === "Student" ? "bg-richblack-900 text-white border-white rounded-full " : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setAccountType("Student")}>Student</h1>
                <h1 className={`${accountType === "Instructor" ? "bg-richblack-900 text-white border-white rounded-full " : ""} cursor-pointer transition-all duration-200 gap-9 hover:text-richblack-5 hover:bg-richblack-900 hover:rounded-full px-8 py-2`} onClick={() => setAccountType("Instructor")}>Instructor</h1>
            </div>

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

            <label className='w-full relative'>
                <p className='text-sm leading-[22px] font-normal text-richblack-5 mb-1'>
                    Password <sub className='text-pink-200 text-lg'>*</sub>
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
                

                <p className='text-right max-w-maxContent text-blue-100 text-xs mt-2'>
                    <Link to="/forgot-password">
                        Forgot Password
                    </Link>
                </p>
            </label>

            <button type='submit' className='bg-yellow-50 border-b-2 border-yellow-5 text-center text-base font-medium text-richblack-900 rounded-lg py-2 px-3 mt-6 hover:scale-95 transition-all duration-200'>
                Log In
            </button>

        </form>
    ) 
}

export default LoginForm