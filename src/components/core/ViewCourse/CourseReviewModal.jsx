import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import CommonBtn from '../../common/CommonBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { useParams } from 'react-router-dom';

const CourseReviewModal = ({setReviewModal}) => {

    const { user } = useSelector((state) => state.profile) ;
    const { token } = useSelector((state) => state.auth) ;

    const courseId = useParams() ;

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm() ;

    useEffect(() => {
        setValue("courseExperience", "") ;
        setValue("courseRating", "") ;
    }, []) ;

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating) ;
    }

    const onSubmit = async(data) => {
        await createRating({courseId: courseId, rating: data.courseRating, review: data.courseExperience}, token) ;

        setReviewModal(false) ;
    }

    return (
        <div>
            {/* modal header */}
            <div>
                <p>
                    Add Review
                </p>

                <button onClick={setReviewModal(false)}>
                    {/* add X icon here */}
                    x
                </button>
            </div>

            {/* modal body */}
            <div>
                <div>
                    <img src={user?.image} alt={`${user?.firstName}-profile`} className='aspect-square w-[50px] rounded-full object-cover' />

                    <div>
                        <p>
                            {user?.firstName} {user?.lastName}
                        </p>

                        <p>
                            Posting Publicly
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>

                    <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />

                    <div>
                        <label htmlFor='courseExperience'>
                            Add Your Experience
                            {/* add *   */}
                        </label>
                        <textarea name="courseExperience" id="courseExperience" placeholder='Add your experience here' className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none min-h-[130px] w-full' {...register("courseExperience", {required: true})} />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }

                    </div>

                    <div>
                        <button onClick={() => setReviewModal(false)}>
                            Cancel
                        </button>

                        <CommonBtn text="Save" />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CourseReviewModal