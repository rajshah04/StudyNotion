import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfileDropDown = () => {
  const { user } = useSelector( (state) => state.profile) ;
  const dispatch = useDispatch() ;


  if(user === null) return ;

  return (
    <div>
      <img src={user?.image} alt={`profile-${user.firstName}`} className="aspect-square w-[30px] rounded-full object-cover" />
    </div>
  )
}

export default ProfileDropDown