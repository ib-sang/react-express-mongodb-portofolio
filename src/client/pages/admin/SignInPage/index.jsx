import React from 'react'

// Components
import Login from './../../../components/Login';

const SignInPage = () => {
    return (
        <div className='login-admin'>
            <div className='user-signin'>
                <img src="./img/ib_photo.png" alt="ib" className='user-signin-img'/>
            </div>
            <Login/>
        </div>
        
    )
}

export default SignInPage
