import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementsField from './RequirementsField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import CommonBtn from '../../../../common/CommonBtn';
import toast from 'react-hot-toast';
import TagsInput from './TagsInput';
import UploadCourseImageVideo from '../UploadCourseImageVideo';

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: {errors},
  } = useForm() ;

  const dispatch = useDispatch() ;
  const { token } = useSelector((state) => state.auth) ;
  const { step } = useSelector((state) => state.course) ;
  const {course, editCourse} = useSelector((state) => state.course) ;
  const [loading, setLoading] = useState(false) ;
  const [courseCategories, setCourseCategories] = useState([]) ;

  useEffect(() => {
    const getCategories = async() => {
      setLoading(true) ;
      const categories = await fetchCourseCategories() ;

      console.log("CATEGORIES : ", categories) ;
      if(categories.length > 0)
        setCourseCategories(categories) ;

      setLoading(false) ;
    }

    if(editCourse){
      setValue("courseTitle", course.courseName) ;
      setValue("courseShortDesc", course.courseDescription) ;
      setValue("coursePrice", course.price) ;
      setValue("courseTags", course.tag) ;
      setValue("courseBenefits", course.whatYouWillLearn) ;
      setValue("courseCategory", course.category) ;
      setValue("courseRequirement", course.instructions) ;
      setValue("courseImage", course.thumbnail) ;
    }

    getCategories() ;
  },[]) ;

  const isFormUpdated = () => {
    const currValue = getValue() ;
    if(currValue.courseTitle !== course.courseName ||
      currValue.courseDesc !== course.courseDescription || 
      currValue.coursePrice !== course.price || 
      // currValue.courseTitle !== course.courseName || 
      // currValue.courseTags.toString() !== course.tag.toString() || 
      currValue.courseBenefits !== course.whatYouWillLearn || 
      currValue.courseCategory._id !== course.category._id || 
      currValue.courseImage !== course.thumbnail || 
      currValue.courseRequirements.toString() !== course.instructions.toString() )
      return true ;
    else  
      return false ;  
  }

  const submitHandler = async(data) => {
    if(editCourse){
      if(isFormUpdated){
        const currValue = getValue() ;
        const formData = new FormData() ;

        formData.append("courseId", course._id) ;
        if(currValue.courseTitle !== course.courseName){
          formData.append("courseName", data.courseTitle) ;
        }
        
        if(currValue.courseDesc !== course.courseDescription){
          formData.append("courseDescription", data.courseDesc) ;
        }
        
        if(currValue.coursePrice !== course.price){
          formData.append("price", data.coursePrice) ;
        }
        
        // if(currValue.courseTags.toString() !== course.tag.toString()){
        //   formData.append("tag", JSON.stringify(data.courseTags)) ;
        // }
        
        if(currValue.courseBenefits !== course.whatYouWillLearn){
          formData.append("whatYouWillLearn", data.courseBenefits) ;
        }
        
        if(currValue.courseCategory._id !== course.category._id){
          formData.append("category", data.courseCategory) ;
        }
        
        if(currValue.courseImage !== course.thumbnail){
          formData.append("thumbnail", data.courseImage) ;
        }
        
        if(currValue.courseRequirements.toString() !== course.instructions.toString()){
          formData.append("instructions", JSON.stringify(data.courseRequirements)) ;
        }


        setLoading(true) ;

        const result = await editCourseDetails(formData, token) ;

        // setLoading(false) ;
        
        if(result){
          setStep(2) ;
          dispatch(setCourse(result)) ;
        }

        setLoading(false) ;
      }
      else{
        toast.error("No changes were done.") ;
      }

      return ;
    }

    // create a new course
    const formData = new FormData() ;
    formData.append("courseName", data.courseTitle) ;
    formData.append("courseDescription", data.courseDesc) ;
    formData.append("price", data.coursePrice) ;
    // formData.append("tag", JSON.stringify(data.courseTags)) ;
    formData.append("whatYouWillLearn", data.courseBenefits) ;
    formData.append("category", data.courseCategory) ;
    formData.append("thumbnail", data.courseImage) ;
    formData.append("instructions", JSON.stringify(data.courseRequirements)) ;
    // formData.append("status", COURSE_STATUS.DRAFT) ;

    setLoading(true) ;

    const result = await addCourseDetails(formData, token) ;
    console.log("FORMDATA : ", formData) ;
    console.log("RESULT : ", result) ;
    console.log("STEP : ", step) ;
    
    if(result){
      console.log("INSIDE RESULT COND")
      // setStep(2) ;
      dispatch(setStep(2)) ;
      console.log("STEP : ", step) ;
      dispatch(setCourse(result)) ;
    }
    
    setLoading(false) ;
  }


  return (
    <form onSubmit={handleSubmit(submitHandler)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8' >
      
      {/* course title */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="courseTitle" className='text-richblack-5 text-sm font-normal'>
          Course Title
          <sup className='text-red-600'>
            *
          </sup>
        </label>

        <input id='courseTitle' name='courseTitle' placeholder='Enter course title' className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600'
        {...register("courseTitle", {required: true})} />
        {
          errors.courseTitle && (
            <span className="-mt-1 text-[12px] text-red-500">
              Course title is required.
            </span>
          )
        }

      </div>
      
      {/* course description */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="courseDesc" className='text-richblack-5 text-sm font-normal'>
          Course Short Description
          <sup className='text-red-600'>
            *
          </sup>
        </label>

        <textarea id='courseDesc' name='courseDesc' placeholder='Enter description of the course' className='min-h-[140px] w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600'
        {...register("courseDesc", {required: true})} />
        {
          errors.courseDesc && (
            <span className="-mt-1 text-[12px] text-red-500">
              Course Description is required.
            </span>
          )
        }

      </div>
      
      {/* course price */}
      <div className='relative flex flex-col gap-2'>
        <label htmlFor="coursePrice" className='text-richblack-5 text-sm font-normal'>
          Course Price
          <sup className='text-red-600'>
            *
          </sup>
        </label>

        <input id='coursePrice' name='coursePrice' placeholder='Enter course price' className='w-full rounded-lg bg-richblack-700 p-3 pl-12 text-richblack-5 border-b-2  border-richblack-600'
        {...register("coursePrice", {
          required: true,
          valueAsNumber: true,
          })} />

          <HiOutlineCurrencyRupee className='absolute top-[42px] left-4 text-xl text-richblack-5' />

        {
          errors.coursePrice && (
            <span className="-mt-1 text-[12px] text-red-500">
              Course Price is required.
            </span>
          )
        }

      </div>
      
      {/* course category */}
      <div className='relative flex flex-col gap-2'>
        <label htmlFor="courseCategory" className='text-richblack-5 text-sm font-normal'>
          Course Category
          <sup className='text-red-600'>
            *
          </sup>
        </label>

        <select name="courseCategory" id="courseCategory" defaultValue="" className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600'
        {...register("courseCategory", {required: true})}
        >

          <option value="" disabled>Choose a category</option>
          {
            !loading && courseCategories.map((category, index) => (
              <option key={index} value={category._id}>
                {category?.name}
              </option>
            ))
          }

        </select>

        {
          errors.courseCategory && (
            <span className="-mt-1 text-[12px] text-red-500">
              Course Category is required.
            </span>
          )
        }

      </div>

      {/* course tags */}
      {/* create a custom component for handling tags input */}
      <TagsInput label="Tags" name="courseTags" placeholder="Enter tags and press enter" register={register} errors={errors} setValue={setValue} getValue={getValue} />

      {/* course thumbnail */}
      {/* create a custom component for taking image as input and display it */}
      <UploadCourseImageVideo label="Course Thumbnail" name="courseThumbnail" register={register} setValue={setValue} errors={errors} editData={editCourse ? course?.thumbnail : null} />

      {/* benefits of the course */}
      <div className='flex flex-col gap-2'>
        <label htmlFor="courseBenefits" className='text-richblack-5 text-sm font-normal'>
          Course Benefits
          <sup className='text-red-600'>
            *
          </sup>
        </label>

        <textarea id='courseBenefits' name='courseBenefits' placeholder='Enter benefits of the course' className='min-h-[70px] w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600'
        {...register("courseBenefits", {required: true})} />
        {
          errors.courseBenefits && (
            <span className="-mt-1 text-[12px] text-red-500">
              Benefits of the course are required.
            </span>
          )
        }

      </div>

      {/* requirements field */}
      {/* video - 101 - 1:04:00 */}
      <RequirementsField label="Course Requirements" name="courseRequirements" placeholder="Enter requirements and press enter" register={register} errors={errors} setValue={setValue} getValue={getValue} />

      <div className='flex gap-x-2 justify-end'>
        {
          editCourse && (
            <button onClick={() => dispatch(setStep(2))} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
              Continue without Saving
            </button>
          )
        }

        <CommonBtn text={!editCourse ? "Next" : "Save Changes"}/>
      </div>


    </form>
  )
}

export default CourseInformationForm