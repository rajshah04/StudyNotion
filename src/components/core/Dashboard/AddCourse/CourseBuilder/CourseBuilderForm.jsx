import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import CommonBtn from '../../../../common/CommonBtn';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BiRightArrow } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  
  const [editSectionName, setEditSectionName] = useState(null) ;

  const { course } = useSelector((state) => state.course) ;
  const [loading, setLoading] = useState(false) ;
  const dispatch = useDispatch() ;
  const { token } = useSelector((state) => state.auth) ;

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm() ;

  const cancelEdit = () => {
    setEditSectionName(null) ;
    setValue("sectionName", "") ;
  }

  const goBack = () => {
    dispatch(setEditCourse(true)) ;
    dispatch(setStep(1)) ;
  }

  const goToNext = () => {
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one section.") ;
      return ;
    }

    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section") ;
      return ;
    }

    // if everything is okay
    dispatch(setStep(3)) ;
  }

  const onSubmit = async (data) => {
    setLoading(true) ;
    let result ;

    if(editSectionName){
      // we are editing the section
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token) ;
    }
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token) ;
    }
    
    // console.log("RESULT : ", result) ;

    // update values
    if(result){
      dispatch(setCourse(result)) ;
      setEditSectionName(null) ;
      setValue("sectionName", "") ;
    }

    setLoading(false) ;
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // console.log("INSIDE HCES") ;
    if(editSectionName === sectionId){
      cancelEdit() ;
      return ;
    }

    setEditSectionName(sectionId) ;
    setValue("sectionName", sectionName) ;
  }

  return (
    <div className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>

      <p className='font-semibold text-2xl text-richblack-5'>
        Course Builder
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* section name */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="sectionName" className='text-richblack-5 text-sm font-normal'>
            Section Name
            <sup className='text-red-600'>
              *
            </sup>
          </label>

          <input type="text" id='sectionName' name='sectionName' placeholder='Add section name' className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2 border-richblack-600' 
          {...register("sectionName", {required: true})} />
          {
            errors.sectionName && (
              <span className="-mt-1 text-[12px] text-red-500">
                Section Name is required.
              </span>
            )
          }
        </div>

        {/* create section btn */}
        <div className='mt-10 flex gap-4'>
          <CommonBtn type="submit" disabled={loading} text={editSectionName ? "Edit Section Name" : "Create Section"} outline={true} customClasses={`text-yellow-50`} children={<IoAddCircleOutline size={20} />} />

          {
            editSectionName && (
              <button type='button' onClick={() => cancelEdit} className='text-sm text-richblack-300 underline'>
                Cancel Edit
              </button>
            )
          }
        </div>

      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }
      
      <div className='flex justify-end gap-x-4'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>
        
        <CommonBtn text="Next" onclick={goToNext} children={<BiRightArrow />} />

      </div>
    </div>
  )
}

export default CourseBuilderForm