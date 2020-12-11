import React from 'react'
import ProductItem from './ProductItem'
import Alert from './Layout/Alert'
import Pagination from './Pagination'


const ProductList = ({ topRated = false, keyword, products, page, pages, category, categoryScreen, recent = false }) => {

    return (
        <>
            <div className="products">
                {products && (
                    (keyword && products.length === 0) ? (
                        <Alert type="transparent">No Products Found</Alert>
                    ) : (
                            products.map(p => {
                                return <ProductItem key={p._id} product={p} />
                            })))
                }
            </div>
            {!topRated && <Pagination
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
                category={category}
                categoryScreen={categoryScreen}
                recent={recent} />}
        </>
    )
}

export default ProductList
