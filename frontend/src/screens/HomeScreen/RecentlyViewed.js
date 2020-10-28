import React from 'react'
import products from '../../products'
import Product from '../../components/ProductItem'


const RecentlyViewed = () => {

    let productList = products.map(p => {
        return <Product key={p._id} product={p} />
    })
    // console.log(productList)
    return (
        <section className="recently-viewed">
            <div className="header container">
                <h3>Recently Viewed</h3>
                <a href="#">See All Items</a>
            </div>
            <div className="products container">
                {productList}
            </div>
        </section>
    )
}

export default RecentlyViewed
