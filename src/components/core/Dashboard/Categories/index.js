import React, { useState } from 'react'
import CommonBtn from '../../../common/CommonBtn'
import { useNavigate } from 'react-router-dom'
import { FiPlusCircle } from 'react-icons/fi';
import CategoriesTable from './CategoriesTable';

const Categories = () => {

    const [categories, setCategories] = useState([]) ;

    const navigate = useNavigate() ;

    return (
        <div>
            <div className='mb-14 flex justify-between items-center'>
                <h1 className='text-3xl font-medium text-richblack-5'>
                    All Categories
                </h1>

                <CommonBtn text="Add Category" children={<FiPlusCircle />} onclick={() => navigate("/dashboard/add-category")} /> 
            </div>

            {
                categories && (
                    <CategoriesTable categories={categories} setCategories={setCategories} />
                )
            }

            {
                !categories && (
                    <div className='text-xl font-medium text-richblack-5'>
                        No Categories Added Yet. Add a category to get started
                    </div>
                )
            }
        </div>
    )
}

export default Categories