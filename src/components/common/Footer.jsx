import React from 'react' ;
import logo from "../../assets/Logo/Logo-Full-Light.png" ;

const Footer = () => {
  return (
    <div className='bg-richblack-800'>
        {/* Column 1 */}
        <div className=''>
            <div>
                <img src={logo} alt='' className='object-contain'></img>
                <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>

            </div>
            <div>


            </div>
        </div>
    </div>
  )
}

export default Footer