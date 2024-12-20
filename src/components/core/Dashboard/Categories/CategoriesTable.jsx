import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../../../services/operations/categoryAPI';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { TRUNCATE_LENGTH } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const CategoriesTable = ({ categories, setCategories }) => {

    const [loading, setLoading] = useState(false) ;
    const navigate = useNavigate() ;

    useEffect(() => {
        // function to fetch all categories from the backend
        const fetchAllCategories = async() => {
            setLoading(true) ;

            const response = await getAllCategories() ;
            console.log("All Categories : ", response) ;

            setCategories(response) ;

            setLoading(false) ;
        }

        fetchAllCategories() ;
    }, []) ;

    return (
        <div>
            <Table className='rounded-3xl border border-richblack-700'>
                <Thead>
                    <Tr className='flex gap-x-12 rounded-t-md border-b border-richblack-700 px-6 py-3'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-100'>
                            Categories
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            No. of Courses
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        categories.length === 0 ? (
                            <Tr>
                                <Td className='py-10 text-center text-2xl font-medium text-richblack-100'>
                                    No Categories Found
                                </Td>
                            </Tr>
                        ) : (
                            categories.map((category) => (
                                <Tr key={category._id} className='flex gap-x-12 border border-richblack-700 px-6 py-8 hover:border-richblack-300'>
                                    <Td className='flex flex-1 gap-x-4'>

                                        <div onClick={() => navigate(`/catalogue/${category.name.split(" ").join("-").toLowerCase()}`)} className='flex flex-col items-start justify-start gap-y-4 cursor-pointer'>
                                            <p className='text-lg font-semibold text-richblack-5'>
                                                {category.name}
                                            </p>

                                            <p  className='text-sm text-richblack-300'>
                                                {
                                                    category.description.split(" ").length > TRUNCATE_LENGTH ? 
                                                    category.description.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                                    : category.description
                                                }
                                            </p>
                                        </div>

                                    </Td>

                                    <Td className='font-medium text-richblack-100 mr-20'>
                                        {
                                            category.course.length || 0
                                        }
                                    </Td>

                                    <Td className='text-sm font-medium text-richblack-100'>
                                        <button disabled={loading} 
                                        onClick={() => {
                                            navigate(`/dashboard/edit-category/${category._id}`)
                                        }} title='Edit' className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                                        >
                                            <FaEdit className='text-xl' />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )
                    }
                </Tbody>
            </Table>    
        </div>
    )
}

export default CategoriesTable