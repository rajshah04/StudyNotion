import React from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../components/core/Dashboard/SideBar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const { loading: authLoading} = useSelector((state) => state.auth) ;
    const { loading: profileLoading} = useSelector((state) => state.auth) ;

    if(authLoading || profileLoading){
        return (
            <div className='w-[100vw] h-[calc(100vh-3.5rem)] grid place-items-center'>
                <div className='custom-loader' />
            </div>
        )
    }
    
    return (
        <div className='relative flex gap-2 min-h-[calc(100vh-3.5rem)] text-white'>
            <SideBar />

            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard