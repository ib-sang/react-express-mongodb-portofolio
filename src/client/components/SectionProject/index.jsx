import React from 'react'

// components
import Cart from './../Cart';

const SectionProject = () => {
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

    let i= 0;

    const AllCart = projects.map(cart =>{
        if(i%2 == 0){
            i++
            return (
                <div className="cart-left" key={cart.id}>
                    <Cart cart={cart} />
                </div>)
            
        }else{
            i++
            return (
                <div className="cart-right"  key={cart.id}>
                    <Cart cart={cart}/>
                </div>
            )
        }
        
    });

    return (
        <section className="section-project">
            <h1 className="section-title">Last projects</h1>
            <p className="section-para">During 5 years at the National Institut of Telecommunications 	and Communication Tecnologies in, I had the chance to carry outa few projects.</p>
            <div className="section-carts">
                {AllCart &&(AllCart)}
            </div>
        </section>
    )
}

export default SectionProject
