import React from 'react'

const CartAdmin = ({cart}) => {
    const img = './img/'+ cart.image;
    return (
        <div className='cart-admin'>
            <div className="cart-admin-head">
                <img src={img} alt="img for day" className="img"/>
            </div>
            <div className="cart-admin-body">
                <div className="cart-admin-body-h">
                    <span>Promuted unitil: 12 June 2021</span>
                </div>
                <h1>Devop, Automate and Provisionning ...</h1>
                <div className="cart-admin-body-f">
                    <span className='cart-admin-status'>Active</span>
                    <span className='cart-admin-show'>623</span>
                    <span className='cart-admin-like'>74</span>
                </div>
            </div>
            <div className="cart-admin-foot">

            </div>
        </div>
    )
}

export default CartAdmin
