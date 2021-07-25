import React from 'react'
import CartAdmin from './../../CartAdmin';
import Icon from './../../../Icon';

const ProjectsAdmin = () => {
    const projects = [
        {
            title:'DevOp, automation and provisioning of an MPLS service provider network with Ansible',
            category: 'Infrastructure',
            image:'topology MPLS.png',
            id:0
        },
        {
            title:'E-service, Angence real estate',
            category: 'Development',
            image:'agence-immobiliere.png',
            id:1
        },
        {
            title:'DevOp, automation and provisioning of an MPLS service provider network with Ansible',
            category: 'Infrastructure',
            image:'topology MPLS.png',
            id:2
        },
        {
            title:'E-service, Angence real estate',
            category: 'Development',
            image:'agence-immobiliere.png',
            id:3
        }

    ];


    const AllCart = projects.map(cart =>{
        return (
            <div className="cart-admin-item" key={cart.id}>
                <CartAdmin cart={cart} />
            </div>)
    });
    return (
        <div className='project-admin'>
            <div className="cart-add">
                <a href="/myprojects-add"><Icon name='plus' />Submit new project</a>
            </div>
            {AllCart &&(AllCart)}
        </div>  
    )
}

export default ProjectsAdmin
