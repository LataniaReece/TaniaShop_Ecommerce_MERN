import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../../components/Rating'
import Meta from '../../components/Layout/Meta'
import { getProductDetail, createProductReview } from '../../actions/productActions'
import Spinner from '../../components/Layout/Spinner'
import Alert from '../../components/Layout/Alert'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../actions/actionTypes/productTypes'

const ProductScreen = ({ match, history }) => {
    const [currentQty, setCurrentQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted')
            setRating(0)
            setComment('')
            window.location.reload()
        } else {
            if (!product || product._id !== match.params.id) {
                dispatch(getProductDetail(match.params.id))
                dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
            }
        }
    }, [match, dispatch, successProductReview, product])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${currentQty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }


    return (

        <>

            {loading && (<Spinner />)}
            {error && <Alert type="danger">{error}</Alert>}
            {product && (
                <>
                    <Meta title={product.name} />
                    <section className="full-product container">
                        <div className="main-content">
                            <div className="card">
                                <div className="card-img">
                                    <img src={product.image} alt="" />
                                </div>
                                <div className="card-content">
                                    <h2 className="card-name">{product.name}</h2>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                    <p className="price"><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
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
                            <div className="reviews">
                                <h2>Reviews</h2>
                                {(!product.reviews || product.reviews.length === 0) && <Alert type="info">No Reviews</Alert>}
                                {(product.reviews && product.reviews.length !== 0) && product.reviews.map(review => {
                                    return <div className="review-card" key={review._id}>
                                        <div className="name">{review.name}</div>
                                        <Rating
                                            value={review.rating}
                                        />
                                        <div className="date">{moment(review.createdAt).format('MM-DD-YYYY')}</div>
                                        <div className="comment">{review.comment}</div>
                                    </div>
                                })}
                            </div>
                            <div className="write-review">
                                <h2>Write A Customer Review</h2>
                                {errorProductReview && <Alert type="danger">{errorProductReview}</Alert>}
                                {userInfo ? (
                                    <form className='review-form' onSubmit={submitHandler}>
                                        <label>
                                            Select Rating:
                                <select name="choose-rating" id="choose-rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=" ">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </label>
                                        <label>
                                            Comment:
                                    <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows="5"></textarea>
                                        </label>
                                        <button className="btn btn-dark">Submit</button>
                                    </form>
                                ) : (
                                        <Alert type="info">Please <Link to="/auth" className="alert-link">Log In</Link> to write a product review!</Alert>
                                    )}

                            </div>
                        </div>
                    </section>
                </>
            )}

        </>
    )
}

export default ProductScreen
