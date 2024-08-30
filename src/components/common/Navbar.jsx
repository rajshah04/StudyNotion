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
            path: "/catalogou/python",
        },
        {
            title: "Web dev",
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
                                            <div className='flex gap-2 items-center'>
                                                <p>
                                                    {link.title}
                                                </p>
                                                <IoIosArrowDown />
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
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
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