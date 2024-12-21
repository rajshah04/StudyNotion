import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { addNewCategory } from '../../../../services/operations/categoryAPI';
import CommonBtn from '../../../common/CommonBtn';

const AddCategory = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm() ;

    const { token } = useSelector((state) => state.auth) ;
    const [loading, setLoading] = useState(false) ;

    const submitHandler = async(data) => {
        console.log("Category data on submit : ", data) ;

        const formData = new FormData() ;
        formData.append("name", data.categoryName) ;  
        formData.append("description", data.categoryDescription) ;  

        setLoading(true) ;

        const result = await addNewCategory(formData, token) ;

        console.log("Result of adding new category : ", result) ;

        setLoading(false) ;
    }

    return (
        <div className='font-medium text-richblack-5'>
            <p className='text-3xl'>
                Add Category
            </p>

            <form onSubmit={handleSubmit(submitHandler)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 my-9'>

                {/* category name */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="categoryName" className='text-richblack-5 text-sm font-normal'>
                        Category Name
                        <sup className='text-red-600'>
                            *
                        </sup>
                    </label>

                    <input id='categoryName' name='categoryName' placeholder='Enter category name' className='w-full rounded-lg bg-richblack-700 px-3 py-2 text-richblack-5 border-b-2  border-richblack-600'
                    {...register("categoryName", {required: true})} />
                    {
                        errors.categoryName && (
                            <span className="-mt-1 text-[12px] text-red-500">
                                Category Name is required.
                            </span>
                        )
                    }

                </div>
                
                {/* category description */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="categoryDescription" className='text-richblack-5 text-sm font-normal'>
                    Category Description
                    <sup className='text-red-600'>
                        *
                    </sup>
                    </label>

                    <textarea id='categoryDescription' name='categoryDescription' placeholder='Enter description of the category' className='min-h-[140px] w-full rounded-lg bg-richblack-700 px-3 py-2 text-richblack-5 border-b-2  border-richblack-600'
                    {...register("categoryDescription", {required: true})} />
                    {
                        errors.categoryDescription && (
                            <span className="-mt-1 text-[12px] text-red-500">
                                Category Description is required.
                            </span>
                        )
                    }

                </div>

                {/* <CommonBtn text={!editCourse ? "Submit" : "Save Changes"}/> */}
                <CommonBtn text={"Submit"}/>

            </form>
        </div>
    )
}

export default AddCategory