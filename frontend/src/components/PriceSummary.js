import React from 'react'

const PriceSummary = ({ obj }) => {
    return (
        <>
            <div className="price-summary">
                <p className="price-type">Items: </p>
                <p className="price">${Number(obj.itemsPrice).toFixed(2)}</p>
            </div>
            <div className="price-summary">
                <p className="price-type">Shipping: </p>
                <p className="price">${Number(obj.shippingPrice).toFixed(2)}</p>
            </div>
            <div className="price-summary">
                <p className="price-type">Tax: </p>
                <p className="price">${Number(obj.taxPrice).toFixed(2)}</p>
            </div>
            <div className="price-summary">
                <p className="price-type">Total: </p>
                <p className="price">${Number(obj.totalPrice).toFixed(2)}</p>
            </div>
        </>
    )
}

export default PriceSummary
