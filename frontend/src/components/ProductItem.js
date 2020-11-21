import React from 'react'
import { Link } from 'react-router-dom'
const ProductItem = ({ product }) => {
    return (
        <div className="card">
            <Link to={`product/${product._id}`}>
                <div className="card-img">
                    <img src={product.image} alt="" />
                </div>
            </Link>
            <div className="card-content">
                <Link className="card-name" to={`product/${product._id}`}>{product.name}</Link>
                <p className="price">${product.price}</p>
            </div>
        </div>
    )
}

export default ProductItem
