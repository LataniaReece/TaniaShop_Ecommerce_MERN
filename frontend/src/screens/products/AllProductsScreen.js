import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../../actions/productActions'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'
import Meta from '../../components/Layout/Meta'
import ProductList from '../../components/ProductList'

const AllProductsScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    let { loading, error, products, pages, page } = productList

    useEffect(() => {

        dispatch(getProducts(keyword, pageNumber))

    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {keyword ? <Meta title='Search Products' /> : <Meta title="All Products" />}
            <section className="product-list container">
                <div className="main-content">
                    <div className="action-header">
                        <Link to="/" className="btn btn-primary btn-stable-hover go-back"><i class="fas fa-arrow-left"></i>Go Back</Link>
                    </div>

                    <h3 className="header">{keyword ? `Search Results: ${keyword}` : 'All Products'}</h3>
                    {loading && <Spinner />}
                    {error && <Alert type="danger">{error}</Alert>}
                    <ProductList
                        keyword={keyword}
                        pageNumber={pageNumber}
                        pages={pages}
                        page={page}
                        products={products}
                    />
                </div>
            </section>
        </>
    )
}

export default AllProductsScreen
