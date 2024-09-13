import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CommonBtn from '../../../common/CommonBtn';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsAPI';

const EditProfileInfo = () => {

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const { user } = useSelector((state) => state.profile) ;
    const { token } = useSelector((state) => state.auth) ;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm() ;

    const submitHandler = (data) => {
        console.log(data)
        dispatch(updateProfile(token, data)) ;
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='bg-richblack-800 flex flex-col px-12 py-8 rounded-md border-2 border-richblack-700 gap-8'>
                
                <h1 className='text-richblack-5 text-xl text-left font-semibold'>
                    Profile Details
                </h1>

                <div className='flex flex-col gap-6 lg:flex-row'>

                    <div className='flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="firstName" className='text-richblack-5 text-sm font-normal'>First Name
                            <span className='text-red-600 text-lg'>*</span>
                        </label>
                        <input type='text' id='firstName' name='firstName' placeholder='Enter first name'
                        {...register("firstName", {required: true})}
                        defaultValue={user?.firstName}
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600' />    
                        {
                            errors.firstName && (
                                <span className="-mt-1 text-[12px] text-red-500">
                                    Please enter your first name
                                </span>
                            )
                        }

                    </div>
                    <div className='flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="lastName" className='text-richblack-5 text-sm font-normal'>Last Name
                            <span className='text-red-600 text-lg'>*</span>
                        </label>
                        <input type='text' id='lastName' name='lastName' placeholder='Enter last name'
                        {...register("lastName", {required: true})}
                        defaultValue={user?.lastName}
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600' />        
                        {
                            errors.lastName && (
                                <span className="-mt-1 text-[12px] text-red-500">
                                    Please enter your last name
                                </span>
                            )
                        }
                    </div>

                </div>

                <div className='flex flex-col gap-6 lg:flex-row'>

                    {/* <p>{user?.additionalDetails.dateOfBirth}</p> */}

                    <div className='flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="dateOfBirth" className='text-richblack-5 text-sm font-normal'>Date of Birth</label>
                        <input type='date' id='dateOfBirth' name='dateOfBirth' placeholder='DD/MM/YYYY'
                        {...register("dateOfBirth", {
                            max:{
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of Birth cannot be in future"
                            }
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600 placeholder:text-richblack-400' />

                        {errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-red-500">
                            {errors.dateOfBirth}
                            </span>
                        )}  
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[45%]'>
                        <label htmlFor="gender" className='text-richblack-5 text-sm font-normal'>Gender</label>

                        <div className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2 border-richblack-600 placeholder:text-richblack-400 flex gap-x-16'>
                            <label htmlFor="male" className='flex gap-x-4 justify-center items-center'>
                                <input
                                    {...register("gender")}
                                    type="radio"
                                    value="Male"
                                    id="male"
                                    // onClick={() => (console.log("Selected Male"))}
                                    className='accent-yellow-25'
                                />
                                <p className='text-richblack-5'>
                                    Male
                                </p>
                            </label>
                            <label htmlFor="female" className='flex gap-x-4 justify-center items-center'>
                                <input
                                    {...register("gender")}
                                    type="radio"
                                    value="Female"
                                    id="female"
                                    // onClick={() => (console.log("Selected Female"))}
                                    className='accent-yellow-25'
                                />
                                <p className='text-richblack-5'>
                                    Female
                                </p>
                            </label>

                        </div>

                    </div>

                </div>

                <div className="flex flex-col gap-6 lg:flex-row">

                    <div className="flex flex-col gap-2 lg:w-[45%]">
                        <label htmlFor="contactNumber" className="'text-richblack-5 text-sm font-normal'">
                            Contact Number
                        </label>
                        <input
                        type="tel"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600 placeholder:text-richblack-400 tracking-wider'
                        {...register("contactNumber", {
                            maxLength: { value: 12, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                        <span className="-mt-1 text-[12px] text-red-500">
                            {errors.contactNumber.message}
                        </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[45%]">
                        <label htmlFor="about" className='text-richblack-5 text-sm font-normal'>
                            About
                        </label>
                        <input
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Tell us about yourself"
                        className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600 placeholder:text-richblack-400'
                        {...register("about")}
                        defaultValue={user?.additionalDetails?.about}
                        />
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

export default EditProfileInfo