import React from 'react'

const Cart = ({cart}) => {
    const img = './img/'+ cart.image;
    return (
        <div className="cart">
            <div className="cart-img">
                <img src={img} alt="img for day" className="img"/>
            </div>
            <div className="cart-body">
                <h2 className="cart-body-title">{cart.category}</h2>
                <h1 className="cart-body-category">{cart.title}</h1>
                <button className="btn-cart">View</button>
            </div>
        </div>
    )
}

export default Cart
