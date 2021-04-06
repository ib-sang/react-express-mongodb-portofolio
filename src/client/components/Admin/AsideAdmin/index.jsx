import React from 'react'

const AsideAdmin = () => {
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
                    <li className='aside-item'><a href="" className='aside-link'>Overviews</a></li>
                    <li className='aside-item'><a href="" className='aside-link'>Settings</a></li>
                    <li className='aside-item'><a href="" className='aside-link'>Projects</a></li>
                    <li className='aside-item'><a href="" className='aside-link'>Billings</a></li>
                    <li className='aside-item'><a href="" className='aside-link'>Messages</a></li>
                </ul>
            </div>
        </div>
    )
}

export default AsideAdmin
