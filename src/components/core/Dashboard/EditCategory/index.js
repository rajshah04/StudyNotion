import React, { useEffect, useState } from 'react';
import AddCategoryForm from '../AddCategory/AddCategoryForm';
import { useParams } from 'react-router-dom';

const EditCategory = () => {

    const { categoryId } = useParams() ;
    const [loading, setLoading] = useState(false) ;

    console.log("Category Id : ", categoryId) ;

    // useEffect(() => {
    //     const populateCategoryDetails = async() => {

    //         const result = await fet

    //     }
    // }, []) ;

    return (
        <div className='font-medium text-richblack-5'>
            <p className='text-3xl'>
                Edit Category
            </p>

            <AddCategoryForm />
        </div>
    )
}

export default EditCategory