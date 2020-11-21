import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../actions/productActions'
import Spinner from '../components/Layout/Spinner'
import Alert from '../components/Layout/Alert'

const ProductScreen = ({ match, history }) => {
    const [currentQty, setCurrentQty] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
    }, [match.params.id, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${currentQty}`)
    }


    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    return (

        <>

            {loading ? (<Spinner />)
                : error ? (<Alert type="danger">{error}</Alert>)
                    : (
                        <section className="full-product">
                            <div className="container">
                                <div className="card">
                                    <div className="card-img">
                                        <img src={product.image} width="90%" alt="" />
                                    </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{product.name}</h2>
                                        <p className="price"><strong>Price:</strong> {product.price}</p>
                                        <p className="description"><strong>Description:</strong> {product.description}</p>
                                        <p className="stock"><strong>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></p>

                                        {product.countInStock > 0 && (
                                            <form>
                                                <label for="qty"><strong>Qty:</strong></label>
                                                <select name="qty" id="qty" value={currentQty} onChange={(e) => setCurrentQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </form>
                                        )}
                                        <button
                                            className="btn btn-primary"
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </section>
                    )
            }


        </>
    )
}

export default ProductScreen
