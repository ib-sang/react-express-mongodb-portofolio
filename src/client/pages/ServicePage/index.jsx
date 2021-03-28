import React from 'react';


import user from './../../api/users'

const ServicePage = () => {

    const dataUser = user.getCurrentUser()

    console.log(dataUser);
    return (
        <div>
            Service
        </div>
    )
}

export default ServicePage
