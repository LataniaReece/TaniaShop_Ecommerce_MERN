import React from 'react'
import { Link } from 'react-router-dom'
const ProductItem = (props) => {
    return (
        <div className="card">
            <div className="card-img">
                <Link to={`product/${props.product._id}`}><img src={props.product.image} alt="" /></Link>
            </div>
            <div className="card-content">
                <Link className="card-name" to={`product/${props.product._id}`}>{props.product.name}</Link>
                <p className="price">${props.product.price}</p>
            </div>
        </div>
    )
}

export default ProductItem
