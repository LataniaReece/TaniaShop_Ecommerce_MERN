import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../actions/productActions'
import Alert from './Layout/Alert'
import Spinner from './Layout/Spinner'
import ProductList from './ProductList'


const TopRated = () => {
    const dispatch = useDispatch()

    const productTopList = useSelector(state => state.productTopList)
    let { loading, error, products } = productTopList

    useEffect(() => {

        dispatch(getTopProducts())

    }, [dispatch])

    return (

        <section className="product-list container">
            <div className="header-container">
                <h3 className="header">Top Rated</h3>
                <Link to="/products" className="btn btn-primary" >See All Items</Link>
            </div>
            {loading && <Spinner />}
            {error && <Alert type="danger">{error}</Alert>}
            <ProductList
                products={products}
            />
        </section>
    )
}

export default TopRated
