import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const dispatch = useDispatch() ;
    const { loading } = useSelector( (state) => state.auth) ;

    const [showPassword, setShowPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;

    const [formData, setFormData] = useState({password: "", confirmPassword: ""}) ;

    const {password, confirmPassword} = formData ;

    const changeHandler = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        })) ;
    }

    const location = useLocation() ;
    const token = location.pathname.split("/").at(-1) ;

    console.log(location) ;
    console.log("token : ", token) ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(resetPassword(token, password, confirmPassword)) ;
    }

    console.log(formData) ;

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
                        <h1 className='text-richblack-5 text-3xl font-semibold' >
                            Choose new password
                        </h1>

                        <p className='text-richblack-300 text-lg font-normal'>
                            Almost done. Enter your new password and you're all set.
                        </p>

                        <form onSubmit={(e) => submitHandler(e)} className='flex flex-col'>
                            {/* create password */}
                            <label className='text-richblack-300'>
                                <p className='my-2'>
                                    New password {" "} <sup className='text-pink-200'>*</sup>
                                </p>
                                
                                <input required type={`${showPassword ? "text" : "password"}`} placeholder='Enter new password' name='password' value={password} onChange={changeHandler} className='px-4 py-2 rounded-md bg-richblack-800 border-b-2 border-richblack-700 min-w-full'  />
                            </label>
                            
                            {/* confirm password */}
                            <label className='text-richblack-300 mt-2'>
                                <p className='my-2'>
                                    Confirm password {" "} <sup className='text-pink-200'>*</sup>
                                </p>
                                
                                <input required type={`${showConfirmPassword ? "text" : "password"}`} placeholder='Confirm new password' name='confirmPassword' value={confirmPassword} onChange={changeHandler} className='px-4 py-2 rounded-md bg-richblack-800 border-b-2 border-richblack-700 min-w-full'  />
                            </label>

                            {/* div for password requirements */}
                            <div>

                            </div>

                            <button type='submit' className='bg-yellow-100 text-richblack-900 border-b-2 border-r-2 border-yellow-25 rounded-md px-4 py-2 mt-6 font-medium'>
                                Reset Password
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

export default UpdatePassword