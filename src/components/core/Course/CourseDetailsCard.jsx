import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import copy from 'copy-to-clipboard';
import { addToCart } from '../../../slices/cartSlice';
import { FaShareSquare } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

const CourseDetailsCard = ({course, setConfirmationModal, buyCourseHandler}) => {

    const { user } = useSelector((state) => state.profile) ;
    const { token } = useSelector((state) => state.auth) ;

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice
    } = course ;

    const addToCartHandler = () => {
        // console.log("Inside add to cart") ;
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, you can't buy a course") ;
            return ;
        }

        if(token){
            dispatch(addToCart(course)) ;
            return ;
        }

        setConfirmationModal({
            text1: "You are not logged in.",
            text2: "Please login to add to cart",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        }) ;
    }

    const shareHandler = () => {
        // console.log("Link : ", window.location.href)
        copy(window.location.href) ;
        toast.success("Link Copied to Clipboard") ;
    }

    return (
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
            <img src={ThumbnailImage} alt='Thumbnail image' className='max-h-60 min-h-[180px] w-[400px] rounded-2xl overflow-hidden object-cover md:max-w-full' />

            <div className='w-[350px] mx-auto'>            

                <div className='space-x-3 pb-4 text-3xl font-semibold'>
                    Rs. {CurrentPrice}
                </div>

                <div className='flex flex-col gap-6'>
                    <button onClick={user && course?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : buyCourseHandler} className='bg-yellow-50 text-richblack-900 cursor-pointer rounded-md px-[20px] py-[8px] font-semibold hover:scale-105 transition-all duration-200' >
                        {
                            user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                        }
                    </button>

                    {
                        !course?.studentsEnrolled.includes(user?._id) &&
                        <button onClick={addToCartHandler} className='cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5 hover:scale-105 transition-all duration-200' >
                            Add to Cart
                        </button>
                    }
                </div>

                <div>
                    <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                        30 Day Money Back GUARANTEE
                    </p>

                    <p className='my-2 text-xl font-semibold'>
                        This course includes :
                    </p>

                    <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                        {
                            course?.instructions?.map((item, ind) => (
                                <p key={ind} className='flex items-center gap-x-2'>
                                    <GoDotFill />

                                    <span>
                                        {item}
                                    </span>
                                </p>
                            ))
                        }
                    </div>
    
                </div>

                {/* share */}
                <div className='text-center'>
                    <button onClick={shareHandler} className='mx-auto flex items-center gap-2 p-6 text-yellow-50' >
                        Share
                        <FaShareSquare size={20} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CourseDetailsCard