import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <ul className=" container checkout-nav">

            {step1 ? (
                <li><Link to="/login">Login</Link></li>
            ) : (
                    <li><Link to="/login" disabled>Login</Link></li>
                )}
            {step2 ? (
                <li><Link to="/shipping">Shipping</Link></li>
            ) : (
                    <li><Link to="/shipping" disabled>Shipping</Link></li>
                )}
            {step3 ? (
                <li><Link to="/placeorder">Place Order</Link></li>
            ) : (
                    <li><Link to="/placeorder" disabled>Place Order</Link></li>
                )}
        </ul>
    )
}

export default CheckoutSteps
