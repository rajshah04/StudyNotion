import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CommonBtn from '../../common/CommonBtn';
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile) ;
    const navigate = useNavigate() ;

    return (
        <div className='flex flex-col justify-center gap-y-8'>

            <h1 className=' text-3xl font-medium text-richblack-5'>
                My Profile
            </h1>

            {/* photo section */}
            <div className='bg-richblack-800 flex justify-between items-center px-12 py-8 rounded-md border-2 border-richblack-700'>
                <div className='flex items-center gap-x-4'>
                    <img src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover' />
                    <div>
                        <p className='text-lg font-semibold text-richblack-5'>
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className='text-sm text-richblack-300'>
                            {user?.email}
                        </p>
                    </div>
                </div>
                
                <CommonBtn text="Edit" 
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
                customClasses={''} >
                    <FiEdit />
                </CommonBtn>
            </div>
            
            {/* about section */}
            <div className='bg-richblack-800 flex justify-between items-start px-12 py-8 rounded-md border-2 border-richblack-700'>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        About
                    </p>
                    <p className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                        {
                            user?.additionalDetails?.about ? user?.additionalDetails?.about 
                            : ("Write something about Yourself") 
                        }
                    </p>
                </div>
                
                <CommonBtn text="Edit" 
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
                customClasses={''} >
                    <FiEdit />
                </CommonBtn>
            </div>
            
            {/* personal details section */}
            <div className='bg-richblack-800 flex justify-between items-start px-12 py-8 rounded-md border-2 border-richblack-700'>
                <div className='flex flex-col gap-y-8'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        Personal Details
                    </p>
                    
                    <div className='flex gap-36'>
                        <div className='flex flex-col gap-6'>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">
                                    First Name    
                                </p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {user.firstName}    
                                </p>    
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">
                                    Email Address
                                </p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {user.email}    
                                </p>    
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">
                                    Gender    
                                </p>
                                <p className={`${user?.additionalDetails?.gender ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                                    {user?.additionalDetails?.gender ? (user?.additionalDetails?.gender) : "Add gender"}    
                                </p>    
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">
                                    Last Name    
                                </p>
                                <p className="text-sm font-medium text-richblack-5">
                                    {user.lastName}    
                                </p>    
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">
                                    Phone Number
                                </p>
                                <p className={`${user?.additionalDetails?.contactNumber ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                                    {user?.additionalDetails?.contactNumber}    
                                </p>    
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-600">
                                    Date of Birth    
                                </p>
                                <p className={`${user?.additionalDetails?.dateOfBirth ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                                    {user?.additionalDetails?.dateOfBirth ? (user?.additionalDetails?.dateOfBirth) : "Add Date of Birth"}    
                                </p>    
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <CommonBtn text="Edit" 
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
                customClasses={''} >
                    <FiEdit />
                </CommonBtn>
            </div>

        </div>
    )
}

export default MyProfile