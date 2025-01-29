import React, { useEffect } from 'react'
import CategoryForm from './CategoryForm';
import { useDispatch } from 'react-redux';
import { setCategory, setEditCategory } from '../../../../slices/categorySlice';

const AddCategory = () => {

    const dispatch = useDispatch() ;

    useEffect(() => {
        dispatch(setCategory(null)) ;
        dispatch(setEditCategory(false)) ;
    }, []) ;

    return (
        <div className='font-medium text-richblack-5'>
            <p className='text-3xl'>
                Add Category
            </p>

            <CategoryForm />
        </div>
    )
}

export default AddCategory