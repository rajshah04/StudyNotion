import React, { useRef, useState } from 'react';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authAPI';


const ProfileDropDown = () => {
  const { user } = useSelector( (state) => state.profile) ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const [openBox, setOpenBox] = useState(false) ;

  // const dropDown = [
  //   {
  //     title: "Dashboard",
  //     link: "/dashboard",
  //   },
  //   {
  //     title: "Logout"
  //   }
  // ]

  const ref = useRef(null) ;
  useOnClickOutside(ref, () => setOpenBox(false)) ;


  if(user === null) return ;

  return (
    <button className='relative' onClick={() => setOpenBox(value => !value)}>
      <img src={user?.image} alt={`profile-${user.firstName}`} className="aspect-square w-[30px] rounded-full object-cover" />
      {/* <AiOutlineCaretDown className="text-sm text-richblack-100" /> */}

      {openBox && (
        <div className={`${openBox ? "visible opacity-100" : "invisible opacity-0" } absolute left-[50%] -translate-x-[80%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-100 text-richblack-900 p-2 w-44 z-50`} ref={ref} onClick={(e) => e.stopPropagation()}>

        <Link to="/dashboard">
          <div className='flex items-center gap-2 py-2 px-3 hover:bg-richblack-700 hover:text-richblack-5 hover:rounded-md'>
            <VscDashboard className='text-xl' />
            Dashboard
          </div>
        </Link>

        <div className='flex items-center gap-2 py-2 px-3 hover:bg-richblack-700 hover:text-richblack-5 hover:rounded-md' 
        onClick={() => {
          // function to logout
          dispatch(logout(navigate)) ;
          setOpenBox(false) ;
        }}>
          <VscSignOut className='text-xl' />
          Logout
        </div>

        </div>
      )}
    </button>
  )
}

export default ProfileDropDown