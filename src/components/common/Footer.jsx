import React from 'react' ;
import logo from "../../assets/Logo/Logo-Full-Light.png" ;
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaGoogle, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FooterLink2 } from "../../data/footer-links" ;

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = [
  "Paid memberships", 
  "For students", 
  "Business solutions"
];

const Community = [
  "Forums", 
  "Chapters", 
  "Events"
];

const BottomFooter = [
  "Privacy Policy", 
  "Cookie Policy", 
  "Terms"
];


const Footer = () => {
  return (
    <div className='bg-richblack-800'>

      <div className='flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>

        <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700'>

          {/* Section 1 */}
          <div className='lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>

            {/* Column 1 */}

            <div className='w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0'>

              <img src={logo} alt='' className='object-contain' />
              <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>
    
              <div className='flex flex-col gap-2'>
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                      <Link to={ele.toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  )
                })}
              </div>

              <div className='flex gap-3 text-lg'>
                <FaFacebook />
                <FaInstagram />
                <FaWhatsapp />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Column 2 */}

            <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
              <h1 className='text-richblack-50 font-semibold text-[16px]'>
                Resources
              </h1>

              <div className='flex flex-col gap-2 mt-2'>
                {Resources.map((ele, i) => {
                  return (
                    <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  ) ;
                })}
              </div>

              <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                Support
              </h1>

              <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2'>
                <Link to={"/help-center"}>
                  Help Center
                </Link>
              </div>
            </div>

            {/* Column 3 */}

            <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
              <h1 className='text-richblack-50 font-semibold text-[16px]'>
                Plans
              </h1>

              <div className='flex flex-col gap-2 mt-2'>
                {Plans.map((ele, index) => {
                  return (
                    <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  ) ;
                })}
              </div>

              <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                Community
              </h1>

              <div className='flex flex-col gap-2 mt-2'>
                {Community.map((ele, index) => {
                  return (
                    <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  ) ;
                })}
              </div>

            </div>

          </div>

          {/* Section 2 */}

          <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3'>
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                  <h1 className='text-richblack-50 font-semibold text-[16px]'>
                    {ele.title}
                  </h1>

                  <div className='flex flex-col gap-2 mt-2'>
                    {ele.links.map((link, index) => {
                      return (
                        <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                          <Link to={link.link}>
                            {link.title}
                          </Link>
                        </div>
                      ) ;
                    })}
                  </div>

                </div>
              ) ;
            })}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Footer