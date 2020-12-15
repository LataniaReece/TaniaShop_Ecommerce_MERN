import React, { useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AccountNav from '../../components/AccountNav'
import { listMyOrders } from '../../actions/orderActions'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'


const AccountScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading, orders } = orderListMy

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (!userInfo) {
            history.push('/auth?redirect=account')
        }

        dispatch(listMyOrders())
    }, [userInfo, dispatch, history])


    return (
        <>
            {userInfo ? (
                loading ? <Spinner /> : (
                    <section class="profile container">
                        <div className="main-content">
                            <h1 class="header">{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}'s Account</h1>
                            <div class="info">
                                <AccountNav />
                                <hr width="1" size="500" />
                                <div class="table-list">
                                    <h3 className="table-heading">Orders</h3>
                                    {orders ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Order Number</th>
                                                    <th>Date</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map((order) => {
                                                    return <tr>
                                                        <td data-label="Order Number">{order._id}</td>
                                                        <td data-label="Date">{moment(order.createdAt).format('MM-DD-YYYY')}</td>
                                                        <td data-label="Price">${order.totalPrice.toFixed(2)}</td>
                                                        <td data-label="Status">{order.isDelivered ? 'Delivered' : 'Processing'}</td>
                                                        <td>
                                                            <Link to={`/order/${order._id}`} class="btn btn-dark btn-sm btn-stable-hover">Details</Link>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (<Alert type="info">No Orders Found. <Link to="/" className="alert-link">Continue Shopping</Link> </Alert>)}
                                </div>
                            </div>
                        </div>
                    </section>
                )
            ) : ''
            }

        </>
    )
}

export default AccountScreen
