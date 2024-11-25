import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import CommonBtn from '../../common/CommonBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

const CourseReviewModal = ({setReviewModal}) => {

    const { user } = useSelector((state) => state.profile) ;
    const { token } = useSelector((state) => state.auth) ;

    const { courseId } = useParams() ;

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm() ;

    useEffect(() => {
        setValue("courseExperience", "") ;
        setValue("courseRating", 0) ;
    }, []) ;

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating) ;
    }

    const onSubmit = async(data) => {
        console.log("Course id : ", courseId) ;

        await createRating({courseId: courseId, rating: data.courseRating, review: data.courseExperience}, token) ;

        setReviewModal(false) ;
    }

    const secondExample = {
        size: 50,
        count: 10,
        color: "black",
        activeColor: "red",
        value: 7.5,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            console.log(`Example 2: new value is ${newValue}`);
        }
    };

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
                {/* modal header */}
                <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-richblack-5'>
                        Add Review
                    </p>

                    <button onClick={() => setReviewModal(false)}>
                        <ImCross className='text-2xl text-richblack-5' />
                    </button>
                </div>

                {/* modal body */}
                <div className='p-6'>
                    <div className='flex items-center w-11/12 mx-auto gap-x-4'>
                        <img src={user?.image} alt={`${user?.firstName}-profile`} className='aspect-square w-[60px] rounded-full object-cover' />

                        <div>
                            <p className='font-semibold text-lg text-richblack-5'>
                                {user?.firstName} {user?.lastName}
                            </p>

                            <p className='text-sm text-richblack-100'>
                                Posting Publicly
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>

                        {/* <ReactStars count={5} onChange={ratingChanged} size="50" activeColor="#ffd700" /> */}

                        {/* <ReactStars {...secondExample} /> */}

                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={50}
                            a11y={true}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />

                        <div className='flex flex-col w-11/12 mt-1 space-y-2'>
                            <label htmlFor='courseExperience' className='text-sm text-richblack-5 px-3'>
                                Add Your Experience
                                <sup className='text-red-600'>*</sup>
                            </label>
                            <textarea name="courseExperience" id="courseExperience" placeholder='Add your experience here' className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none min-h-[130px] w-full' {...register("courseExperience", {required: true})} />
                            {
                                errors.courseExperience && (
                                    <span className='ml-2 text-xs tracking-wide text-red-600'>
                                        Share details of your own experience for this course
                                    </span>
                                )
                            }

                        </div>

                        <div className='mt-6 flex w-11/12 justify-end gap-x-4'>
                            <button onClick={() => setReviewModal(false)} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 hover:scale-110 transition-all duration-200' >
                                Cancel
                            </button>

                            <CommonBtn text="Save" customClasses={'hover:scale-110 transition-all duration-200'} />
                        </div>

                    </form>
                </div>
            </div>
        
        </div>
    )
}

export default CourseReviewModal