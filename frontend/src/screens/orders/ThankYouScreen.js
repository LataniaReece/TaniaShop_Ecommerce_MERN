import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Alert from '../../components/Layout/Alert'
import { getOrderDetails } from '../../actions/orderActions'
import Spinner from '../../components/Layout/Spinner'
import Meta from '../../components/Layout/Meta'


const ThankYouScreen = ({ match }) => {
    const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))
    }, [match.params.id, dispatch])

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, error, order } = orderDetails

    return (
        <>

            {loading ? <Spinner /> :
                error ? <Alert type="danger">{error}</Alert> :
                    (
                        <>
                            <Meta title='Thank You' />
                            <section class="thank-you container">
                                <div className="main-content">
                                    <div class="text">
                                        <p class="order-number"><strong>Order #:</strong> {order._id}</p>
                                        <h1 class="heading">Thank you for your order!</h1>
                                        <img src="https://images.unsplash.com/photo-1502355984-b735cb2550ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                            alt="" />
                                        <div className="actions">
                                            <Link to="/" className="btn btn-dark btn-stable-hover">Continue Shopping</Link>
                                            <Link to="/account" className="btn btn-dark btn-stable-hover">View My Orders</Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )
            }
        </>

    )
}

export default ThankYouScreen
