import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import CommonBtn from '../../../../common/CommonBtn';
import UploadCourseImageVideo from '../UploadCourseImageVideo';

const SubSectionModal = ({modalData, setModalData, add = false, view = false, edit = false}) => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm() ;

    const dispatch = useDispatch() ;
    const [loading, setLoading] = useState(false) ;
    const { course } = useSelector((state) => state.course) ;
    const { token } = useSelector((state) => state.auth) ;

    useEffect(() => {
        if(view || edit){
            // console.log("Modal Data : ", modalData) ;
            setValue("lectureTitle", modalData.title) ;
            setValue("lectureDesc", modalData.description) ;
            setValue("lectureVideo", modalData.videoUrl) ;
        }
    }, []) ;

    const isFormUpdated = () => {
        console.log("In is form updated ?")
        const currentValues = getValues() ;
        if(currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.videoUrl){
            return true ;
        }
        else{
            return false ;
        }
    }

    const handleEditSubSection = async() => {
        const currentValues = getValues() ;
        const formData = new FormData() ;

        formData.append("sectionId", modalData.sectionId) ;
        formData.append("subSectionId", modalData._id) ;

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle) ;
        }

        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description", currentValues.lectureDesc) ;
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("videoFile", currentValues.lectureVideo) ;
        }

        setLoading(true) ;

        const result = await updateSubSection(formData, token) ;

        if(result){
            // updating the course
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section) ;

            const updatedCourse = {...course, courseContent: updatedCourseContent} ;
            dispatch(setCourse(updatedCourse)) ;
        }

        setModalData(null) ;
        setLoading(false) ;
    }

    const onSubmit = async(data) => {

        if(view)
            return ;

        if(edit){
            if(isFormUpdated()){
                console.log("Is form updated true")
                handleEditSubSection() ;
            }
            else{
                console.log("Is form updated false")
                toast.error("No changes made to the form") ;
            }
            return ;
        }

        const formData = new FormData() ;
        formData.append("sectionId", modalData) ;
        formData.append("title", data.lectureTitle) ;
        formData.append("description", data.lectureDesc) ;
        formData.append("videoFile", data.lectureVideo) ;
        setLoading(true) ;

        // API call
        const result = await createSubSection(formData, token) ;

        if(result){
            // check for validation
            // updating the course
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section) ;

            const updatedCourse = {...course, courseContent: updatedCourseContent} ;
            dispatch(setCourse(updatedCourse)) ;
            console.log("New created course : ", course) ;
        }
        console.log("New created course : ", course) ;

        setModalData(null) ;
        setLoading(false) ;
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
                <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-richblack-5'>
                        {
                            view && "Viewing "
                        }
                        {
                            add && "Adding "
                        }
                        {
                            edit && "Editing "
                        }

                        Lecture
                    </p>

                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className='text-2xl text-richblack-5' />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 px-8 py-10' >
                    {/* lecture title */}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="lectureTitle" className='text-richblack-5 text-sm font-normal'>
                            Lecture Title
                            {
                                !view && (
                                <sup className='text-red-600'>
                                    *
                                </sup>
                            )}  
                        </label>
                        <input id='lectureTitle' name='lectureTitle' placeholder='Enter Lecture Title' className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600'
                        {...register("lectureTitle", {required: true})} />
                        {
                            errors.lectureTitle && (
                                <span className='-mt-1 text-[12px] text-red-500'>
                                    Lecture Title is required.
                                </span>
                            )
                        }
                    </div>

                    <UploadCourseImageVideo name="lectureVideo" label="Lecture Video" register={register} setValue={setValue} errors={errors} video={true} viewData={view ? modalData.videoUrl : null} editData={edit ? modalData.videoUrl : null}/>

                    {/* lecture description */}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="lectureDesc" className='text-richblack-5 text-sm font-normal' >
                            Lecture Description
                            {
                                !view && (
                                <sup className='text-red-600'>
                                    *
                                </sup>
                            )}  
                        </label>
                        <textarea name="lectureDesc" id="lectureDesc" placeholder='Enter Lecture Description' className='w-full min-h-[130px] rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600'
                        {...register("lectureDesc", {required: true})} />
                        {
                            errors.lectureDesc && (
                                <span className='-mt-1 text-[12px] text-red-500'>
                                    Lecture Description is required.
                                </span>
                            )
                        }
                    </div>

                    {
                        !view && (
                            <div className='my-2'>
                                <CommonBtn customClasses={`${loading ? "cursor-not-allowed" : ""}`} text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} />
                            </div>
                        )
                    }
                </form>
            </div>

        </div>
    )
}

export default SubSectionModal