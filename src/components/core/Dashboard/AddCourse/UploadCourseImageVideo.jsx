import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadCourseImageVideo = ({name, label, register, setValue, errors, video = false, viewData = null, editData = null}) => {

    const { course } = useSelector((state) => state.course) ;
    const [selectedFile, setSelectedFile] = useState(null) ;
    const [previewFile, setPreviewFile] = useState(null) ;
    
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            showPreviewFile(file)
            setSelectedFile(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: !video ? { "image/*": [".jpeg", ".jpg", ".png"] } : { "video/*": [".mp4"] },
        onDrop,
    }) ;


    const showPreviewFile = (file) => {
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewFile(reader.result)
        }
    }

    const inputRef = useRef(null) ;

    useEffect(() => {
        register(name, {required: true}) ;
    }, [register]) ;

    useEffect(() => {
        setValue(name, selectedFile) ;
        console.log("File set : ", name, " : ", selectedFile) ;
    }, [selectedFile, setValue]) ;

    return (
        <div className='relative flex flex-col gap-2'>
            <label htmlFor={name} className='text-richblack-5 text-sm font-normal'>
                {label}
                {
                    !viewData && (
                        <sup className='text-red-600'>
                            *
                        </sup>
                    )
                }
            </label>

            <div className={` ${isDragActive ? 'bg-richblack-600' : 'bg-richblack-700'} flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
                {
                    previewFile ? (
                        <div className='text-center flex w-full flex-col p-6'>
                            {
                                video ? (
                                    <Player src={previewFile} playsInline aspectRatio='16:9' />
                                ) : (
                                    <img src={previewFile} alt='preview' className='h-full w-full rounded-md object-cover' />
                                )
                            }

                            {
                                !viewData && (
                                    <button onClick={() => {setPreviewFile(""); setSelectedFile(null); setValue(name, null);}} className='text-richblack-100 my-4 underline hover:text-richblack-400'>
                                        Cancel
                                    </button>
                                )
                            }
                        </div>
                    ) 
                    : (
                        <div {...getRootProps()} className='flex flex-col items-center p-8'>
                            
                            <input {...getInputProps()} ref={inputRef} />

                            <div className='grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800'>
                                <FaCloudUploadAlt className='text-yellow-50 text-2xl' />
                            </div>

                            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                Drag and drop {!video ? "an image" : "a video"}, or click to {" "}
                                <span className="font-semibold text-yellow-50">
                                    Browse {" "}
                                </span> 
                                a file
                            </p>

                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                                <li>
                                    Aspect ratio 16:9
                                </li>
                                <li>
                                    Recommended size 1024x576
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
            {
                errors[name] && (
                    <span className="-mt-1 text-[12px] text-red-500">
                        {label} is required.
                    </span>
                )
            }
        </div>
    )
}

export default UploadCourseImageVideo