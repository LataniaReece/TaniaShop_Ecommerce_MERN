import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Layout/Alert'
import { deliverOrder, getOrderDetails } from '../../actions/orderActions'
import Spinner from '../../components/Layout/Spinner'
import SmallProductItem from '../../components/SmallProductItem'
import PriceSummary from '../../components/PriceSummary'
import { ORDER_DELIVER_RESET } from '../../actions/actionTypes/orderTypes'


const OrderDetailsScreen = ({ match, history }) => {
    const [message, setMessage] = useState('')

    const orderId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, error, order } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver

    useEffect(() => {
        if (!order || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))

        }
    }, [match.params.id, dispatch, successDeliver, orderId, order])


    const previousPage = history.goBack

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
        dispatch({ type: ORDER_DELIVER_RESET })
        setMessage('Order successfuly marked as delivered')

    }

    return (
        <>
            {
                loading ? <Spinner /> :
                    error ? <Alert type="danger">{error}</Alert> : (
                        <section className="container order-details">
                            {message && <Alert type="info">{message}</Alert>}
                            <button onClick={previousPage} className="btn btn-primary go-back"><i class="fas fa-arrow-left"></i>Go Back</button>
                            <div className="main">
                                <div className="cart-items">
                                    <h2><strong>Order #:</strong>{order._id}</h2>
                                    {order.orderItems.map(item => {
                                        return <SmallProductItem cart={false} key={item.productId} item={item} showQty={true} />
                                    })
                                    }
                                </div>
                                <div className="cart-info">
                                    <h3 className="subtotal-heading">Subtotal ({order.orderItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h3>
                                    <PriceSummary obj={order} />
                                    {loadingDeliver && <Spinner />}
                                    {errorDeliver && <Alert type="info">{errorDeliver}</Alert>}
                                    {userInfo && userInfo.isAdmin && !order.isDelivered && (
                                        <button className="btn-dark btn deliver-btn" onClick={deliverHandler}>Mark As Delivered</button>
                                    )}
                                    {userInfo && userInfo.isAdmin && order.isDelivered && (
                                        <button className="btn already-delivered-btn" disabled>Delivered</button>
                                    )}
                                </div>
                            </div>

                        </section>

                    )
            }

        </>
    )
}

export default OrderDetailsScreen
