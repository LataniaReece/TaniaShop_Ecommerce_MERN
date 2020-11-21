import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import Product from '../../components/ProductItem'
import Spinner from '../../components/Layout/Spinner'
import Alert from '../../components/Layout/Alert'


const RecentlyViewed = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList



    return (
        <section className="recently-viewed">
            <div className="header container">
                <h3>Recently Viewed</h3>
                <Link to="#" className="btn btn-primary">See All Items</Link>
            </div>
            { loading ? (
                <Spinner />
            ) : error ? (
                <Alert type="transparent">{error}</Alert>
            ) : (
                        <div className="products container">
                            {products.map(p => {
                                return <Product key={p._id} product={p} />
                            })
                            }
                        </div>
                    )}

        </section>
    )
}

export default RecentlyViewed
