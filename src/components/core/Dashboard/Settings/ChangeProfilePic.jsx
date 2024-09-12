import React from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { useSelector } from 'react-redux';


const ChangeProfilePic = () => {

    const { user } = useSelector((state) => state.profile) ;

    const changeImageHandler = () => {

    }

    const removeImageHandler = () => {
        
    }

    return (
        <div className='bg-richblack-800 flex items-center px-12 py-8 rounded-md border-2 border-richblack-700 gap-x-8'>
            
            <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover' />

            <div className='flex flex-col gap-3'>
                <h1 className='text-richblack-25 font-medium'>Change Profile Picture</h1>

                <div className='flex gap-4'>

                    <button onClick={changeImageHandler} className='text-center text-[16px] px-4 py-2 font-semibold rounded-md bg-yellow-50 text-richblack-900 border-b-2 border-r-2 border-yellow-5 hover:scale-95 transition-all duration-200 flex items-center gap-x-2'>
                        Upload
                        <MdCloudUpload size={20} />
                    </button>

                    <button onClick={removeImageHandler} className='text-center text-[16px] px-4 py-2 text-richblack-50 rounded-md font-bold bg-richblack-700 border-b-2 border-r-2 border-richblack-600 hover:scale-95 transition-all duration-200'>
                        Remove
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ChangeProfilePic