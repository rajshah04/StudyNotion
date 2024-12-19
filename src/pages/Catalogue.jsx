import React, { useEffect, useState } from 'react';
import Footer from '../components/common/Footer';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCataloguePageData } from '../services/operations/cataloguePageAPI';
import Course_Card from '../components/core/Catalogue/Course_Card';
import CourseSlider from '../components/core/Catalogue/CourseSlider';

const Catalogue = () => {

    const { catalogueName } = useParams() ;
    const [cataloguePageData, setCataloguePageData] = useState(null) ;
    const [categoryId, setCategoryId] = useState("") ;
    const [active, setActive] = useState(1) ;

    // fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            const response = await apiConnector("GET", categories.SHOW_ALL_CATEGORIES_API) ;

            const category_id = response?.data?.allCategoriesDetails?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogueName)[0]._id ;

            console.log("Category id in catalogue page: ", category_id) ;
            setCategoryId(category_id) ;
        }

        getCategories() ;
    }, [catalogueName]) ;

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const response = await getCataloguePageData(categoryId) ;

                console.log("Response of fetching catalogue page data : ", response) ;

                setCataloguePageData(response) ;
                console.log("Catalogue page data after setting : ", cataloguePageData) ;

                // console.log("Trying to find diff. categories courses : ", cataloguePageData?.data?.differentCategories?.course) ;
            }
            catch(err){
                console.log("Error in fetching catalogue page data : ", err) ;
            }
        }

        if(categoryId)
            getCategoryDetails() ;
    }, [categoryId]) ;

    return (
        <div>
            
            <div className='box-content bg-richblack-800 px-4'>
                <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
                    <p className='text-sm text-richblack-300'>
                        {`Home / Catalogue / `}
                        <span className='text-yellow-25'>
                            {cataloguePageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className='text-3xl text-richblack-5'>
                        {cataloguePageData?.data?.selectedCategory?.name}
                    </p>
                    <p className='max-w-[870px] text-richblack-200'>
                        {cataloguePageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* section 1 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div>
                    <div className='text-richblack-5 font-semibold text-2xl lg:text-4xl'>
                        Courses to get you started
                    </div>
                    <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
                        <p className={`px-4 py-2 ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50" } cursor-pointer`} onClick={() => setActive(1)}
                        >
                            Most Popular
                        </p>
                        <p className={`px-4 py-2 ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`} onClick={() => setActive(2)}
                        >
                            New
                        </p>
                    </div>

                    <CourseSlider Courses={cataloguePageData?.data?.selectedCategory?.course} />
                </div>
            </div>

                {/* section 2 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                    <p className='text-2xl font-bold text-richblack-5 lg:text-4xl'>
                        Top Courses in {cataloguePageData?.data?.differentCategories?.name}
                    </p>

                    <div className='py-8'>
                        <CourseSlider Courses={cataloguePageData?.data?.differentCategories?.course} />
                    </div>
                </div>

                {/* section 3 */}
                <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                    <p className='text-2xl font-bold text-richblack-5 lg:text-4xl'>
                        Most Selling Courses 
                    </p>

                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            
                            {cataloguePageData?.data?.top10Courses?.slice(0, 4).map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"} />
                            ))} 
                            
                        </div>
                    </div>
                </div>

            <Footer />
        </div>
    )
}

export default Catalogue