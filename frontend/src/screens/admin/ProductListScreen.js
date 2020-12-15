import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'
import { deleteProduct, getProducts, createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../actions/actionTypes/productTypes'
import Pagination from '../../components/Pagination'


const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })

        if (userInfo && userInfo.isAdmin) {
            if (successCreate) {
                history.push(`/admin/products/${createdProduct._id}/edit`)
            } else {
                dispatch(getProducts('', pageNumber))
            }
        } else {
            history.push('/auth')
        }

    }, [userInfo, dispatch, history, successDelete, successCreate, createdProduct, pageNumber])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            {userInfo && (
                loading ? <Spinner /> :
                    error ? <Alert type="danger">{error}</Alert> : (
                        <section className="admin-products container">
                            <div className="main-content">
                                <div className="heading">
                                    <h1 className="header">Products</h1>
                                    <button className="btn btn-dark" onClick={createProductHandler}> <i className="fas fa-plus"></i>Create Product</button>
                                </div>
                                {loadingDelete && <Spinner />}
                                {errorDelete && <Alert type="danger">{errorDelete}</Alert>}
                                {loadingCreate && <Spinner />}
                                {errorCreate && <Alert type="danger">{errorCreate}</Alert>}
                                <div className="table-list admin-list">
                                    {products && (
                                        <>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>NAME</th>
                                                        <th>PRICE</th>
                                                        <th>CATEGORY</th>
                                                        <th>BRAND</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((product) => {
                                                        return <tr key={product._id}>
                                                            <td data-label="ID">{product._id}</td>
                                                            <td data-label="Name">{product.name}</td>
                                                            <td data-label="Price">${Number(product.price).toFixed(2)}</td>
                                                            <td data-label="Category">{product.category}</td>
                                                            <td data-label="Brand">{product.brand}</td>
                                                            <td>
                                                                <button className="icon-action"><Link to={`/admin/products/${product._id}/edit`}><i className='fas fa-edit'></i></Link></button>
                                                                <button onClick={() => deleteHandler(product._id)} className="icon-action"><i className="fas fa-trash"></i></button>
                                                            </td>
                                                        </tr>
                                                    })}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                pages={pages}
                                                page={page}
                                                isAdminProducts="true"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))
            }
        </>
    )
}

export default ProductListScreen

