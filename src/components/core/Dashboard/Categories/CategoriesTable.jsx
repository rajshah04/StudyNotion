import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../../../services/operations/categoryAPI';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { TRUNCATE_LENGTH } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

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
            <Table className='rounded-3xl'>
                <Thead>
                    <Tr className='flex gap-x-12 rounded-t-md border border-richblack-500 px-6 py-3 text-richblack-5 bg-richblack-500'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase'>
                            Categories
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase'>
                            No. of Courses
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase'>
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
                            categories.map((category, index, array) => (
                                <Tr key={category._id} className={`flex gap-x-12 border border-richblack-700 ${index === array.length - 1 ? "rounded-b-md" : ""} px-6 py-6 hover:border-richblack-300 items-center`}>
                                    <Td className='flex flex-1 gap-x-4'>

                                        <div className='flex flex-col items-start justify-start gap-y-4'>
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

                                    <Td className='font-medium text-richblack-100 mr-10'>
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
                                        
                                        <button disabled={loading} onClick={() => navigate(`/catalogue/${category.name.split(" ").join("-").toLowerCase()}`)} title='Go to Category page' className='px-2 transition-all duration-200 hover:scale-110 hover:text-yellow-300'
                                        >
                                            <GoArrowRight className='text-xl' />
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