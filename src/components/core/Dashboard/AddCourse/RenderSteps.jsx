import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course) ;

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ] ;

    return (
        <div>
            <div className='relative mb-2 flex w-full justify-center'>
                
                {
                    steps.map( (item) => (
                        <>
                            <div className='flex flex-col items-center' key={item.id}>
                                <div className={`${step >= item.id ? "bg-yellow-900 border border-yellow-50 text-yellow-50" : "bg-richblack-800 border border-richblack-700 text-richblack-300"} rounded-full w-10 h-10 grid place-items-center mb-2`}>
                                    {
                                        step > item.id ? <FaCheck className='font-bold' /> : item.id
                                    }

                                </div>

                                <div className='flex min-w-[130px] flex-col items-center gap-y-2 mb-8' key={item.id}>
                                    <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                            {/* add code for dashes between the labels */}
                            {item.id !== steps.length && (
                            <>
                                <div className={`h-[calc(40px/2)] w-full border-dashed border-b-2 ${step > item.id  ? "border-yellow-50" : "border-richblack-500"} `} key={item.id}>
                                </div>
                            </>
                            )}


                        </>
                    ))
                }

            </div>

            {/* <div className='flex flex-row justify-evenly mb-16'> */}
            {/* <div className='relative mb-16 flex w-full select-none justify-between'>
                {
                    steps.map((item) => (
                        <>
                            <div className='flex min-w-[130px] flex-col items-center gap-y-2' key={item.id}>
                                <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                                    {item.title}
                                </p>
                            </div>
                        </>
                    ))
                }
            </div> */}

            {
                step === 1 && <CourseInformationForm />
            }
            {
                step === 2 && <CourseBuilderForm />
            }
            {/* {
                step === 3 && <PublishCourseForm />
            } */}
        </div>
    )
}

export default RenderSteps