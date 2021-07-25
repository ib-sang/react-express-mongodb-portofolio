import React from 'react';


import projects from './../../api/projects'

const ServicePage = () => {

    const dataUser = projects.findById('60fc866f7ec45619b09fb8eb')

    console.log(dataUser);
    return (
        <div>
            Service
        </div>
    )
}

export default ServicePage
