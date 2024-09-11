import React from 'react';
import CommonBtn from './CommonBtn';

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white backdrop-blur-sm bg-opacity-20'>
        <div className='w-11/12 max-w-[350px] rounded-lg border-2 border-richblack-400 bg-richblack-800 p-6'>
            <p className='text-2xl text-left font-semibold text-richblack-5'>
                {modalData.text1}
            </p>
            <p className='text-richblack-300 text-left leading-6 mt-3 mb-5'>
                {modalData.text2}
            </p>

            <div className='flex gap-x-4'>
                <CommonBtn onclick={modalData.btn1Handler}
                    text={modalData.btn1Text}
                />
                <button className='rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={modalData.btn2Handler}>
                    {modalData.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal