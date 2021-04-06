import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdminMenu = () => {

    const [ menuActive, setMenuActive ] = useState(false);
    const {pathname} = useLocation();


    const isSubPath = ($subpath) =>{
        return pathname.indexOf($subpath) !==-1
    }

    const handleMenuActive = () => {
        if(menuActive){
            setMenuActive(false);
        }else{
            setMenuActive(true);
        }
    }

    const classWrap = menuActive ? "navbar is-active admin-menu": "navbar admin-menu";


    return (
        <div className={classWrap}>

            <div className='navbar-brand'>

                <div className="navbar-brand-logo">
                    <img src="./ib_logo.svg" alt="folio IB" className="logo"/>
                </div>

                <div className="navbar-menu">
                    <nav className="nav-collapse">
                        <ul className='navbar-items'>
                            <li className='navbar-item'><a href="/dashboard" className={isSubPath('dashboard') ? 'active': ''}>Dashboard</a></li>
                            <li className='navbar-item'><a href="/myprofile" className={isSubPath('myprofile') ? 'active' : ''}>My profile</a></li>
                            <li className='navbar-item'><a href="/gotosite" className={isSubPath('gotosite') ? 'active' : ''}>Go to site</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="navbar-langue">
                    <ul className="navbar-langue-items">
                        <li className="navbar-langue-item"><a href="" className="navbar-langue-link">FR</a></li>
                        <li className="navbar-langue-item"><a href="" className="navbar-langue-link active">EN</a></li>
                    </ul>
                </div>

                <div className="navbar-toolbar-menu" onClick={ handleMenuActive }>
                    <span className="navbar-toolbar-menubar"></span>
                </div>

            </div>

        </div>
    )
}

export default AdminMenu
