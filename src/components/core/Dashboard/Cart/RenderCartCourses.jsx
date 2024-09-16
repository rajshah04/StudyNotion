import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';
import { MdDelete } from 'react-icons/md';

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart) ;

    const dispatch = useDispatch() ;

    return (
        <div className='flex flex-1 flex-col'>
            {
                cart.map((course, index) => (
                    <div key={index} className={`flex w-full flex-wrap items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"} `}>

                        <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                            <img src={course?.thumbnail} alt={course?.courseName} className='h-[148px] w-[220px] rounded-lg object-cover' />

                            <div className='flex flex-col space-y-1'>
                                <p className='text-lg font-medium text-richblack-5'>
                                    {course?.courseName}
                                </p>
                                <p className='text-sm text-richblack-300'>
                                    {course?.category?.name}
                                </p>

                                {/* TODO : add ratings with stars and reviews count */}
                            </div>
                        </div>

                        <div className='flex flex-col items-end space-y-2'>
                            <button onClick={() => dispatch(removeFromCart(course?.id))} className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-red-600'>
                                <MdDelete />    
                                <span>
                                    Remove
                                </span>
                            </button>

                            <p className='mb-6 text-3xl font-medium text-yellow-100'>
                                ₹ {course?.price}
                            </p>
                        </div>

                    </div>
                ))
            }            
        </div>
    )
}

export default RenderCartCourses