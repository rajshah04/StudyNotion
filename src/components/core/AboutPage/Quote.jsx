import React from 'react'
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-richblack-100 md:text-4xl font-semibold text-4xl text-center '>

        {/* <ImQuotesLeft /> */}

        <p>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightText text={" combines technology"} />
            , {" "} 
            <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent '>
                expertise
            </span>, and community to create an 
            <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent font-bold'>
                {" "}unparalleled educational experience.
            </span>
        </p>
        
        {/* <ImQuotesRight /> */}
    </div>
  )
}

export default Quote