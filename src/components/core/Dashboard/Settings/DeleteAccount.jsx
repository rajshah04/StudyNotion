import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import DeleteConfirmationModal from './DeleteConfirmationModal';


const DeleteAccount = () => {

    const [deleteModal, setDeleteModal] = useState(false) ;

    return (
        <div className='bg-red-950 flex px-12 py-8 rounded-md border-2 border-richblack-700 gap-8 items-start'>

            <div className='text-pink-200 bg-pink-700 rounded-full p-2'>
                <MdDeleteForever className='text-4xl' />
            </div>

            <div className='flex flex-col gap-y-3'>
                <h1 className='text-xl font-bold text-pink-5'>
                    Delete Account
                </h1>

                <p className='text-pink-25 font-medium text-sm'>
                    Would you like to delete your account?
                </p>

                <p className='text-pink-25 font-medium text-sm'>
                    This account contains PAID COURSES. Deleting your account will remove all the contain associated with it.
                </p>

                <p className='text-pink-25 font-medium text-sm'>
                    Once you delete your account, there is no going back. Please be certain.
                </p>

                {/* <button className='font-semibold text-lg flex items-start w-fit text-red-50 bg-richblack-900 hover:text-red-600 hover:bg-white rounded-lg px-4 py-2'> */}
                <button onClick={() => setDeleteModal(true)} className='font-semibold text-lg flex items-start w-fit bg-yellow-200 text-richblack-900 hover:text-red-600 hover:bg-white rounded-lg px-4 py-2'>
                    Delete my account
                </button>

                {
                    deleteModal && <DeleteConfirmationModal setDeleteModal={setDeleteModal} />
                }
            </div>
            
        </div>
    )
}

export default DeleteAccount