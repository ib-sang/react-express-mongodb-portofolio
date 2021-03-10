import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Icon from './../../Icon';

const PrincipalMenu = () => {
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

    const classWrap = menuActive ? "navbar is-active": "navbar";

    return (
        <div className={classWrap}>

            <div className='navbar-brand'>

                <div className="navbar-brand-logo">
                    <img src="./ib_logo.svg" alt="folio IB" className="logo"/>
                </div>

                <div className="navbar-menu">
                    <nav className="nav-collapse">
                        <ul className='navbar-items'>
                            <li className='navbar-item'><a href="/" className={pathname ==='/' ? 'active': ''}>Home</a></li>
                            <li className='navbar-item'><a href="/aboutme" className={isSubPath('aboutme') ? 'active' : ''}>About me</a></li>
                            <li className='navbar-item'><a href="/services" className={isSubPath('services') ? 'active' : ''}>Services</a></li>
                            <li className='navbar-item'><a href="/contactme" className={isSubPath('contactme') ? 'active' : ''}>Contact me</a></li>
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

export default PrincipalMenu
