import React from 'react';
import * as Icons from 'react-icons/vsc';
import * as aiIcons from 'react-icons/ai';
import { matchPath, NavLink, useLocation} from 'react-router-dom';


const SideBarLink = ({link, iconName}) => {
    
    let Icon = Icons[iconName] ;
    if(link.id == 6)
        Icon = aiIcons[iconName] ;
    const location = useLocation() ;

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname) ;
    }

    return (
        <NavLink to={link.path} 
        // onClick={} 
        className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 border-l-2 border-l-yellow-50 text-yellow-50" : "bg-opacity-0 text-richblack-300"}`} >

            <div className='flex gap-2 items-center'>
                
                <Icon className='text-lg' />
                <span>{link.name}</span>
            </div>
            
        </NavLink>
    )
}

export default SideBarLink