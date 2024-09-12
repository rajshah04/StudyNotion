import React from 'react';
import ChangeProfilePic from './ChangeProfilePic';
import EditProfileInfo from './EditProfileInfo';

const Settings = () => {
  return (
    <div className='flex flex-col justify-center gap-y-8'>

        <h1 className='text-richblack-5 font-medium text-3xl'>Edit Profile</h1>

        <ChangeProfilePic />

        <EditProfileInfo />

    </div>
  )
}

export default Settings