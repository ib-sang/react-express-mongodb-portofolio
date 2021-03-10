import React from 'react';

// Menus
import PricipalMenu from './../../Menus/PrincipalMenu';
import Topbar from "./../../Menus/Topbar";

const UserHeader = () => {
    return (
        <header className='header'>
            <Topbar/>
            <PricipalMenu/>
        </header>
    )
}

export default UserHeader
