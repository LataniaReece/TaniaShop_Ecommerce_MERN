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

        <>
            { loading ? <Spinner /> :
                error ? <Alert type="danger">{error}</Alert> :
                    <section className="product-list container">
                        <div className="main-content" style={{ padding: "30px 0" }}>
                            <div className="header-container">
                                <h3 className="header">Top Rated</h3>
                                <Link to="/products" className="btn btn-primary" >See All Items</Link>
                            </div>
                            <ProductList
                                products={products}
                            />
                        </div>
                    </section>
            }
        </>
    )
}

export default TopRated
