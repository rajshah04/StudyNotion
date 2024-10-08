import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CommonBtn from '../../../../common/CommonBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourseForm = () => {

    const { course } = useSelector((state) => state.course) ;
    const { token } = useSelector((state) => state.auth) ;

    const [loading, setLoading] = useState(false) ;

    const dispatch = useDispatch() ;

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
    } = useForm() ;

    const submitHandler = async(data) => {
        handleCoursePublish() ;
    }

    const goBack = () => {
        dispatch(setStep(2)) ;
    }

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("publishCourse", true) ;
        }
    }, [])
    

    const handleCoursePublish = async() => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("publishCourse") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("publishCourse") === false)){
            // form is not updated
            goToCourses() ;
        }
        else{
            const formData = new FormData() ;
            formData.append("courseId", course._id) ;

            const courseStatus = getValues("publishCourse") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT ;
            formData.append("status", courseStatus) ;

            setLoading(true) ;
            
            // const result = await editCourseDetails(formData, token) ;

            // if(result){
            //     goToCourses() ;
            // }

            setLoading(false) ;
        }
    }

    const goToCourses = () => {
        dispatch(resetCourseState()) ;
        // TODO : navigate to /dashboard/my-courses
    }

    return (
        <div className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8' >
            <p>
                Publish Course
            </p>

            <form onSubmit={handleSubmit(submitHandler)}>

                {/* course title */}
                <div className='flex items-center gap-2'>

                    <input type='checkbox' id='publishCourse' name='publishCourse'  className='w-4 h-4 rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600 cursor-pointer'
                    {...register("publishCourse")} />

                    <label htmlFor="publishCourse" className='text-richblack-5 font-normal cursor-pointer'>
                        Make this course available for everyone
                    </label>
                </div>

                <div className='mt-4 flex justify-end gap-x-4'>
                    <button type="button" onClick={goBack} className='rounded-md cursor-pointer flex items-center' >
                        Back
                    </button>

                    <CommonBtn text="Save Changes" />
                </div>

            </form>
        </div>
    )
}

export default PublishCourseForm