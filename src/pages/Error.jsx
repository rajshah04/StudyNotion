import React from 'react'
import { VscError } from 'react-icons/vsc'

const Error = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-[90vh]'>
        <p className='text-richblack-5 text-3xl'>
            Error 404
        </p>
        <VscError className='text-9xl text-white' />
        <p className='text-richblack-5 text-3xl'>
            Page Not Found
        </p>
    </div>
  )
}

export default Error