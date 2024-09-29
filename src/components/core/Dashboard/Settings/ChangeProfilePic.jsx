import React, { useEffect, useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../../../services/operations/settingsAPI';

// functionality to upload or remove image in frontend
 
const ChangeProfilePic = () => {
    const dispatch = useDispatch() ;
    const { token } = useSelector((state) => state.auth) ;
    const { user } = useSelector((state) => state.profile) ;

    const imageUploadRef = useRef() ;

    // properties for uploading image
    const [image, setImage] = useState(null) ;
    const [previewSource, setPreviewSource] = useState(null) ;
    const [loading, setLoading] = useState(false) ;

    const uploadImageHandler = (event) => {
        event.preventDefault() ;
        // console.log("INSIDE UPLOADIMAGEHANDLER") ;
        // console.log("IMAGE UPLOAD REF : ", imageUploadRef.current) ;
        imageUploadRef.current.click() ;
    }

    const changeHandler = () => {
        const uploadedImage = imageUploadRef.current.files[0] ;
        setImage(uploadedImage) ;
        previewFile(uploadedImage) ;
    }

    const previewFile = (file) => {
        const reader = new FileReader() ;
        reader.readAsDataURL(file) ;
        reader.onloadend = () => {
            setPreviewSource(reader.result) ;
        }

        // uploadImage(file) ;
    }

    const uploadImage = (image) => {
        try {
            console.log("Uploading...") ;
            setLoading(true) ;
            const formData = new FormData() ;
            formData.append("profilePicture", image) ;
            // console.log("formdata", formData) ;
            dispatch(updateProfilePicture(token, formData)).then(() => {
              setLoading(false) ;
            })
          }
          catch(err){
            console.log("ERROR MESSAGE - ", err.message)
          }
    }
    

    // useEffect(() => {
    //     console.log("Image", image)
    // }, []) ;

    useEffect(() => {
        if(image){
            previewFile(image) ;
            uploadImage(image) ;
        }
    }, [image]) ;

    const removeImageHandler = () => {
        
    }

    return (
        <div className='bg-richblack-800 flex items-center px-12 py-8 rounded-md border-2 border-richblack-700 gap-x-8'>
            
            <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover' accept="image/png, image/gif, image/jpeg" />

            <div className='flex flex-col gap-3'>
                <h1 className='text-richblack-25 font-medium'>Change Profile Picture</h1>

                    <div className='flex gap-4'>

                        <form id='form' encType='multipart/form-data'>
                    
                            <input type='file' id='imageInput' ref={imageUploadRef} onChange={changeHandler} accept="image/png, image/jpeg" hidden />
                    
                            <button type='submit' onClick={uploadImageHandler} className='text-center text-[16px] px-4 py-2 font-semibold rounded-md bg-yellow-50 text-richblack-900 border-b-2 border-r-2 border-yellow-5 hover:scale-95 transition-all duration-200 flex items-center gap-x-2' >
                                Upload
                                <MdCloudUpload size={20} />
                            </button>

                        </form>

                        <button onClick={removeImageHandler} className='text-center text-[16px] px-4 py-2 text-richblack-50 rounded-md font-bold bg-richblack-700 border-b-2 border-r-2 border-richblack-600 hover:scale-95 transition-all duration-200'>
                            Remove
                        </button>
                    </div>

            </div>

        </div>
    )
}

export default ChangeProfilePic