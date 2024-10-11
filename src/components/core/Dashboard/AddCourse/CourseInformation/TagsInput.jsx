import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const TagsInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

    const { course, editCourse } = useSelector((state) => state.course) ;
    const [tags, setTags] = useState([]) ;

    // write function to add a tag
    const handleToAddTag = (e) => {
        if(e.key === "Enter" || e.key === ","){
            e.preventDefault() ;

            console.log("Key pressed", e.key)

            const newTag = e.target.value.trim() ;
            console.log("NewTag : ", newTag) ;

            if(newTag && !tags.includes(newTag)){
                console.log("INSIDE IF")
                setTags([...tags, newTag]) ;
                tags.push(newTag) ;
                e.target.value = "" ;
            }

            console.log("TAGS : ", tags) ;
        }
    }

    // write function to delete the tag
    const handleToDeleteTag = (index) => {
        const newTags = [...tags] ;
        newTags.splice(index, 1) ;
        setTags(newTags) ;
    }

    useEffect(() => {
        if(editCourse){
            setTags(course?.tag) ;
        }

        console.log("Tags : ", tags) ;

        register(name, {
            required: true,
            // validate: (value) => value.length > 0
        })
    }, []) ;

    useEffect(() => {
        setValue(name, tags) ;
    }, [tags]) ;


    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name} className='text-richblack-5 text-sm font-normal'>
            {label}
            <sup className='text-red-600'>
                *
            </sup>
            </label>

            <div className="flex w-full flex-wrap gap-y-2">
                {/* show tags */}
                {
                    tags.map((tag, index) => (
                        <div key={index} className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>

                            {tag}

                            <button type='button' onClick={() => handleToDeleteTag(index)}>
                                <IoCloseSharp />
                            </button>
                        </div>
                    ))
                }

                {/* input */}
                <input id={name} name={name} placeholder={placeholder} className='w-full rounded-lg bg-richblack-700 p-3 text-richblack-5 border-b-2  border-richblack-600' onKeyDown={handleToAddTag} />
            </div>
            {
                errors[name] && (
                    <span className="-mt-1 text-[12px] text-red-500">
                    Course Tags are required.
                    </span>
                )
            }

        </div>
    )
}

export default TagsInput