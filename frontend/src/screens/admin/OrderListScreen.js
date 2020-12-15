import React, { useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../actions/orderActions'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'
import Pagination from '../../components/Pagination'


const OrderListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, orders, pages, page } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(pageNumber))
        } else {
            history.push('/auth')
        }

    }, [userInfo, dispatch, history, pageNumber])

    return (
        <>

            {userInfo && (
                loading ? <Spinner /> :
                    orders ? (
                        <section className="container admin-orders">
                            <div className="main-content">
                                <div className="heading">
                                    <h1 className="header">Orders</h1>
                                </div>
                                <div className="table-list admin-list">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ORDER NUMBER</th>
                                                <th>USER</th>
                                                <th>DATE</th>
                                                <th>TOTAL</th>
                                                <th>DELIVERED</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => {
                                                return <tr key={order._id}>
                                                    <td data-label="Order Number">{order._id}</td>
                                                    <td data-label="Name">{order.user.name}</td>
                                                    <td data-label="Date">{moment(order.createdAt).format('MM-DD-YYYY')}</td>
                                                    <td data-label="Total">${order.totalPrice.toFixed(2)}</td>
                                                    <td data-label="Delivered">
                                                        {order.isDelivered ? (
                                                            <i className="fas fa-check" style={{ color: 'green' }}></i>
                                                        ) : (
                                                                <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                            )}
                                                    </td>
                                                    <td>
                                                        <button className="details-btn btn btn-sm btn-dark btn-stable-hover"><Link to={`/order/${order._id}`}>Details</Link></button>
                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        pages={pages}
                                        page={page}
                                        isAdminOrders={true}
                                    />
                                </div>
                            </div>
                        </section>
                    ) : (
                            <section className="container">
                                <div className="main-content">
                                    <Alert type="danger"> No orders found. </Alert>
                                </div>
                            </section>))
            }
        </>
    )
}

export default OrderListScreen
