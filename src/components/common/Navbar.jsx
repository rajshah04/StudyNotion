import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import {NavbarLinks} from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';


const Navbar = () => {
    const { token } = useSelector( (state) => state.auth ) ;
    const { user } = useSelector( (state) => state.profile ) ;
    const { totalItems } = useSelector( (state) => state.cart ) ;

    // const [subLinks, setSubLinks] = useState([]) ;

    // const fetchSubLinks = async() => {
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API) ;
    //         console.log("Printing sublinks result", result) ;
    //         setSubLinks(result.data.data) ;
    //     }catch(err){
    //         console.log("Could not fetch the catalogue list") ;
    //     }
    // }

    // useEffect( () => {
    //     fetchSubLinks() ;
    // }, [])

    const subLinks = [
        {
            title: "Python",
            path: "/catalogue/python",
        },
        {
            title: "Web development",
            path: "/catalogue/web-dev",
        }
    ] ;

    const location = useLocation() ;
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname) ;
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[2px] border-b-richblack-700'>

            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                {/* image */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>

                {/* NavbarLinks */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalogue" ? (
                                            <div className='relative flex gap-2 items-center group'>
                                                <p>
                                                    {link.title}
                                                </p>
                                                <IoIosArrowDown />

                                                <div className='invisible absolute left-[50%]
                                                -translate-x-[50%] translate-y-[40%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-50'>

                                                    <div className='absolute left-[50%] top-0 translate-y-[-40%] translate-x-[120%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                    </div>

                                                    {
                                                        subLinks.length ? (
                                                            subLinks.map((subLink, index) => (
                                                                <Link to={`${subLink.path}`} key={index}>
                                                                    <p>
                                                                        {subLink.title}
                                                                    </p>
                                                                </Link>
                                                            ) )
                                                        ) 
                                                        : (
                                                            <div>
                                                            </div>
                                                        )
                                                    }

                                                </div>

                                            </div>
                                        ) 
                                        : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/Signup/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-richblack-5' size={26} />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-2 -right-1 bg-richblack-5 rounded-full w-5 h-5 animate-bounce flex items-center justify-center'>
                                            <p className='text-richblack-900 text-sm font-semibold'>
                                                {totalItems}
                                            </p>
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border  border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 transition-all duration-200'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border  border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 transition-all duration-200'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>

        </div>
    )
}

export default Navbar