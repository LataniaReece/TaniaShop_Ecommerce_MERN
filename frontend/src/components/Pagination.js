import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({ pages, page, isAdminProducts = false, isAdminOrders = false, isAdminUsers = false, keyword = '', category, categoryScreen = false, recent = false }) => {


    return pages > 1 && (
        <ul class="pagination">
            {[...Array(pages).keys()].map((x) => {
                return <li key={x + 1} className={x + 1 === page ? 'active' : ''}>
                    <Link
                        to={
                            keyword ? `/search/${keyword}/page/${x + 1}`
                                : categoryScreen ? `/product/category/${category}/page/${x + 1}`
                                    : recent ? `/products/recent/page/${x + 1}`
                                        : isAdminProducts ? `/admin/products/page/${x + 1}`
                                            : isAdminOrders ? `/admin/orders/page/${x + 1}`
                                                : isAdminUsers ? `/admin/users/page/${x + 1}`
                                                    : `/products/page/${x + 1}`}>
                        {x + 1}
                    </Link>
                </li>

            })}
        </ul>
    )
}

export default Pagination
