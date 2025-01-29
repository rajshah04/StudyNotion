import React, { useEffect, useState } from 'react';
import CategoryForm from '../AddCategory/CategoryForm';
import { useParams } from 'react-router-dom';
import { getSpecificCategoryDetails } from '../../../../services/operations/categoryAPI';
import { useDispatch } from 'react-redux';
import { setCategory, setEditCategory } from '../../../../slices/categorySlice';

const EditCategory = () => {

    const { categoryId } = useParams() ;
    const [loading, setLoading] = useState(false) ;

    console.log("Category Id : ", categoryId) ;

    const dispatch = useDispatch() ;

    useEffect(() => {
        const populateCategoryDetails = async() => {
            setLoading(true) ;

            const result = await getSpecificCategoryDetails(categoryId) ;

            console.log("Result of fetching category details : ", result) ;

            dispatch(setCategory(result)) ;
            dispatch(setEditCategory(true)) ;

            setLoading(false) ;
        }

        populateCategoryDetails() ;
    }, []) ;

    if(loading){
        return (
            <div className='h-[80vh] w-full grid place-items-center'>
                <div className='custom-loader'>
        
                </div>
            </div>
        )
    }

    return (
        <div className='font-medium text-richblack-5'>
            <p className='text-3xl'>
                Edit Category
            </p>

            <CategoryForm />
        </div>
    )
}

export default EditCategory