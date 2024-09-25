import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementsField = ({name, label, placeholder, register, errors, setValue, getValue,}) => {

    const { course, editCourse } = useSelector((state) => state.course) ;
    const [requirement, setRequirement] = useState("") ;
    const [requirementList, setRequirementList] = useState([]) ;

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]) ;
            setRequirement("") ;
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList] ;
        updatedRequirementList.splice(index, 1) ;
        setRequirementList(updatedRequirementList) ;
    }

    useEffect(() => {
        if(editCourse){
            setRequirementList(course?.instructions) ;
        }
        register(name, {required: true,
            validate: (value) => value.length > 0
        })
    }, []) ;

    useEffect(() => {
        setValue(name, requirementList) ;
    }, [requirementList]) ;

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name} className='text-richblack-5 text-sm font-normal'>
                {label}
                <sup className='text-red-600'>
                    *
                </sup>
            </label>

            <div>
                <input type="text" id={name} name={name} placeholder={placeholder} value={requirement} onChange={(e) => setRequirement(e.target.value)}  className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2 border-richblack-600' 
                // {...register(name, {required: true, validate: (value) => value.length > 0})} 
                />

                <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-25 m-3'>
                    Add
                </button>

                {
                    requirementList.length > 0 && (
                        <ul className='m-2'>
                            {
                                requirementList.map((requirement, ind) => (
                                    <li key={ind} className='flex items-center text-richblack-5'>
                                        <span>
                                            {requirement}
                                        </span>

                                        <button type='button' onClick={(index) => handleRemoveRequirement(index)} className='text-xs text-pure-greys-300 mx-2'>
                                            clear
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

                {
                    errors[name] && (
                        <span className="-mt-1 text-[12px] text-red-500">
                            {label} is required.
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default RequirementsField