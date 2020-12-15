import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentProducts } from '../../actions/productActions'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'
import ProductList from '../../components/ProductList'
import Meta from '../../components/Layout/Meta'


const RecentProductsScreen = ({ match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productRecentList = useSelector(state => state.productRecentList)
    let { loading, error, products, page, pages } = productRecentList

    useEffect(() => {

        dispatch(getRecentProducts(pageNumber))

    }, [dispatch, pageNumber])

    return (
        <>
            <Meta title="New Arrivals" />
            <section className="product-list container">
                <div className="main-content">

                    <div className="action-header">
                        <Link to="/" className="btn btn-primary go-back btn-stable-hover"><i class="fas fa-arrow-left"></i>Go Back</Link>
                        <Link to="/products" className="btn btn-primary btn-stable-hover">See All Items</Link>
                    </div>
                    <h3 className="header">New Arrivals</h3>
                    {loading && <Spinner />}
                    {error && <Alert type="danger">{error}</Alert>}
                    <ProductList
                        products={products}
                        page={page}
                        pages={pages}
                        recent={true}
                    />
                </div>
            </section>
        </>
    )
}

export default RecentProductsScreen
