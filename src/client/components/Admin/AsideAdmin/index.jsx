import React from 'react';
import { useLocation } from 'react-router-dom';

const AsideAdmin = () => {

    const {pathname} = useLocation();


    const isSubPath = ($subpath) =>{
        return pathname.indexOf($subpath) !==-1
    }

    return (
        <div className='aside-prifile'>
            <div className="aside-head">
                <div className="aside-media">
                    <img src="./img/ib_photo.png" alt="Sangaré Ibrahima" className='aside-img' />
                </div>
                <h3 className='aside-title'>Sangaré Ibrahima Baba</h3>
            </div>
            <div className="aside-body">
                <ul className='aside-items'>
                    <li className='aside-item'><a href="" className={isSubPath('dashboard') ? 'active aside-link': 'aside-link'}>Overviews</a></li>
                    <li className='aside-item'><a href="" className={isSubPath('setting') ? 'active aside-link': 'aside-link'}>Settings</a></li>
                    <li className='aside-item'><a href="/myprojects" className={isSubPath('myprojects') ? 'active aside-link': 'aside-link'}>Projects</a></li>
                    <li className='aside-item'><a href="" className={isSubPath('billings') ? 'active aside-link': 'aside-link'}>Billings</a></li>
                    <li className='aside-item'><a href="" className={isSubPath('messages') ? 'active aside-link': 'aside-link'}>Messages</a></li>
                </ul>
            </div>
        </div>
    )
}

export default AsideAdmin
