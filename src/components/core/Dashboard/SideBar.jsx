import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../../data/dashboard-links';
import SideBarLink from './SideBarLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';

const SideBar = () => {

  const {user, loading: profileLoading} = useSelector((state) => state.profile) ;
  const {loading: authLoading} = useSelector((state) => state.auth) ;

  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const[confirmationModal, setConfirmationModal] = useState(null) ;

  if(authLoading || profileLoading){
    return (
      <div className='w-[100vw] h-[calc(100vh-3.5rem)] grid place-items-center'>
        <div className='custom-loader' />
      </div>
    ) ;
  }

  return (
    <div className='text-white'>

      <div className='flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

        <div className='flex flex-col'>
          {
            sidebarLinks.map((link) => {
              if(link.type && user?.accountType !== link.type) return null ;

              return (
                <SideBarLink key={link.id} link={link} iconName={link.icon} />
              )
            })
          }
        </div>

        <div className='my-6 mx-auto w-10/12 h-[1px] bg-richblack-600'></div>

        <div className='flex flex-col'>
          
          <SideBarLink link={{name:"Settings", path:"/dashboard/settings"}} iconName={"VscSettingsGear"} />

          <button onClick={ () => setConfirmationModal({
            text1: "Are You Sure ?",
            text2: "You will be logged out of your account",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null)
          })}
          className='relative px-8 py-2 text-sm font-medium' >

            <div className='flex items-center gap-x-2 text-richblack-300'>
              <VscSignOut className='text-lg' />
              <span>Log Out</span>
            </div>

          </button>
        </div>

      </div>

      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }

    </div>
  )
}

export default SideBar