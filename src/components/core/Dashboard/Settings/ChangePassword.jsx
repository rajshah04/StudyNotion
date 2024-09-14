import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonBtn from '../../../common/CommonBtn';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../services/operations/settingsAPI';


const ChangePassword = () => {

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const { token } = useSelector((state) => state.auth) ;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm() ;

    const [showPassword, setShowPassword] = useState(false) ;
    const [showNewPassword, setShowNewPassword] = useState(false) ;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) ;

    const submitHandler = (data) => {
        dispatch(changePassword(token, data)) ;
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='bg-richblack-800 flex flex-col px-12 py-8 rounded-md border-2 border-richblack-700 gap-8'>

                <h1 className='text-richblack-5 text-xl text-left font-semibold'>
                    Change Password
                </h1>

                <div className='flex flex-col gap-6 lg:flex-row'>
                    
                    <div className='relative flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="password" className='text-richblack-5 text-sm font-normal'>
                            Current Password
                            <span className='text-red-600 text-lg'>*</span>
                        </label>

                        <input type={`${showPassword ? "text" : "password"}`} id='password' name='password' placeholder='Enter current password'
                        {...register("password", {required: true})} 
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600' />

                        {
                            errors.password && (
                                <span className="-mt-1 text-[12px] text-red-500">
                                    Please enter current password
                                </span>
                            )
                        }

                        <span className='absolute' onClick={() => setShowPassword((prev) => (!prev))}>
                            {
                                showPassword ? 
                                (<AiOutlineEyeInvisible className='cursor-pointer text-2xl translate-x-[23rem] translate-y-12' fill='#AFB2BF' />) 
                                : (<AiOutlineEye className='cursor-pointer text-2xl translate-x-[23rem] translate-y-12' fill='#AFB2BF' />)
                            }
                        </span>
                    </div>

                </div>

                <div className='flex flex-col gap-6 lg:flex-row'>
                    
                    <div className='relative flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="newPassword" className='text-richblack-5 text-sm font-normal'>
                            New Password
                            <span className='text-red-600 text-lg'>*</span>
                        </label>

                        <input type={`${showNewPassword ? "text" : "password"}`} id='newPassword' name='newPassword' placeholder='Enter new password'
                        {...register("newPassword", {required: true})} 
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600' />

                        {
                            errors.newPassword && (
                                <span className="-mt-1 text-[12px] text-red-500">
                                    Please enter new password
                                </span>
                            )
                        }

                        <span className='absolute' onClick={() => setShowNewPassword((prev) => (!prev))}>
                            {
                                showNewPassword ? 
                                (<AiOutlineEyeInvisible className='cursor-pointer text-2xl translate-x-[23rem] translate-y-12' fill='#AFB2BF' />) 
                                : (<AiOutlineEye className='cursor-pointer text-2xl translate-x-[23rem] translate-y-12' fill='#AFB2BF' />)
                            }
                        </span>
                    </div>
                    
                    <div className='relative flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="confirmPassword" className='text-richblack-5 text-sm font-normal'>
                            Confirm Password
                            <span className='text-red-600 text-lg'>*</span>
                        </label>

                        <input type={`${showConfirmPassword ? "text" : "password"}`} id='confirmPassword' name='confirmPassword' placeholder='Confirm new password'
                        {...register("confirmPassword", {required: true})} 
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600' />

                        {
                            errors.confirmPassword && (
                                <span className="-mt-1 text-[12px] text-red-500">
                                    Please confirm your new password
                                </span>
                            )
                        }

                        <span className='absolute' onClick={() => setShowConfirmPassword((prev) => (!prev))}>
                            {
                                showConfirmPassword ? 
                                (<AiOutlineEyeInvisible className='cursor-pointer text-2xl translate-x-[23rem] translate-y-12' fill='#AFB2BF' />) 
                                : (<AiOutlineEye className='cursor-pointer text-2xl translate-x-[23rem] translate-y-12' fill='#AFB2BF' />)
                            }
                        </span>
                    </div>

                </div>

            </div>
            

            <div className='w-full mt-8 flex gap-x-4 justify-end'>

                <button className='rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:scale-95 transition-all duration-200' onClick={() => navigate("/dashboard/my-profile")}>
                    Cancel
                </button>

                <CommonBtn type="submit" text="Save" customClasses={'hover:scale-95 transition-all duration-200'} />
            </div>
        </form>
    )
}

export default ChangePassword