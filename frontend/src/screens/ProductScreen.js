import React from 'react'
import products from '../products'

const ProductScreen = (props) => {
    const product = products.find((p) => p._id === props.match.params.id)


    return (
        <section class="full-product extend-height">
            <div class="container">
                <div class="card">
                    <div class="card-img">
                        <img src={product.image} width="90%" alt="" />
                    </div>
                    <div class="card-content">
                        <h2 className="card-name">{product.name}</h2>
                        <p class="price"><strong>Price:</strong> {product.price}</p>
                        <p class="description"><strong>Description:</strong> {product.description}</p>
                        <button class="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ProductScreen
