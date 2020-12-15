import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCategory } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Layout/Spinner'
import Alert from '../../components/Layout/Alert'
import ProductList from '../../components/ProductList'
import Meta from '../../components/Layout/Meta'

const CategoryScreen = ({ match }) => {
    const requestedCategory = match.params.category
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productCategoryList = useSelector(state => state.productCategoryList)
    const { loading, products, page, pages, error } = productCategoryList

    useEffect(() => {
        dispatch(getProductsByCategory(requestedCategory, pageNumber))
    }, [dispatch, requestedCategory, pageNumber])

    let fixedCategory
    if (requestedCategory === 'homedecor') {
        fixedCategory = 'Home Decor'
    }

    if (requestedCategory === 'bodycare') {
        fixedCategory = 'Body Care'
    }

    return (
        <>
            <Meta title="Shop By Category" />
            <section className="product-list category-view container">
                <div className="main-content">
                    <div className="action-header">
                        <Link to="/" className="btn btn-primary go-back btn-stable-hover"><i class="fas fa-arrow-left"></i>Go Back</Link>
                        <Link to="/products" className="btn btn-primary btn-stable-hover">See All Items</Link>
                    </div>
                    <div className="heading">
                        {fixedCategory ? (
                            <h3 className="header">Category: {fixedCategory}</h3>

                        ) : (
                                <h3 className="header">Category: {requestedCategory.charAt(0).toUpperCase() + requestedCategory.slice(1)}</h3>
                            )}
                    </div>
                    {loading && <Spinner />}
                    {error && <Alert type="transparent">{error}</Alert>}
                    <ProductList
                        pageNumber={pageNumber}
                        pages={pages}
                        page={page}
                        products={products}
                        category={match.params.category}
                        categoryScreen={true}
                    />
                </div>
            </section>
        </>
    )
}

export default CategoryScreen
