import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {

    const { token } = useSelector((state) => state.auth) ;

    // this will prevent authenticated users from using this route

    if(token === null)
        return children ;
    else
        return <Navigate to="/dashboard/my-profile" />
}

export default OpenRoute