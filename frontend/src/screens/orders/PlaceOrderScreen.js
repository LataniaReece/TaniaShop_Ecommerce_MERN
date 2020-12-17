import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps'
import Spinner from '../../components/Layout/Spinner'
import Alert from '../../components/Layout/Alert'
import { createOrder } from '../../actions/orderActions'
import PriceSummary from '../../components/PriceSummary'
import Meta from '../../components/Layout/Meta'
import SmallProductItem from '../../components/SmallProductItem'

const PlaceOrderScreen = ({ history }) => {
    const [message, setMessage] = useState('')

    const [paid, setPaid] = useState(false)
    const [payPalPaidAmount, setPayPalPaidAmount] = useState(0)
    const [sdkReady, setSdkReady] = useState(false)
    const [orderButtonEnabled, setOrderButtonEnabled] = useState(false)

    const [paymentMethod, setPaymentMethod] = useState('')
    const [finalPaymentResult, setFinalPaymentResult] = useState({})

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    // Calculate Prices 
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )

    cart.shippingPrice = addDecimals(cart.itemsPrice < 100 ? 0 : 25.99)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    useEffect(() => {
        if (!userInfo) {
            history.push('/auth?redirect=placeorder')
        }
        if (success) {
            history.push(`/order/thankyou/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success])

    const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.intent = "authorize"
        script.id = "paypal-script"
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }, [])


    const payPalSuccessPaymentHandler = (paymentResult) => {
        if (paymentResult.status === "COMPLETED") {
            setPayPalPaidAmount(paymentResult.purchase_units[0].amount.value)
            setPaymentMethod('PayPal')
            setPaid(true)
            setFinalPaymentResult(paymentResult)
            setOrderButtonEnabled(true)
        } else {
            setMessage('Your Paypal did not go through')
        }
    }

    const placeOrderHandler = () => {
        // Create order
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            paymentResult: {
                id: finalPaymentResult.id,
                status: finalPaymentResult.status,
                update_time: finalPaymentResult.update_time,
                email_address: finalPaymentResult.payer.email_address,
                total_paid: finalPaymentResult.purchase_units[0].amount.value,
            },
        }))

        // Get order and go to thank you page
    }

    return (
        <>
            <Meta title='Place Order' />
            <CheckoutSteps step1 step2 step3 />
            <section className="container">
                <div className="place-order-grid  main-content">
                    <div className="order-review">

                        <div className="order-info">
                            <h4 className="section-heading">Shipping</h4>
                            <p> <strong>Address: </strong>{cart.shippingAddress.address}. {' '} {cart.shippingAddress.city}, {' '} {cart.shippingAddress.postalCode}, {' '} {cart.shippingAddress.country}</p>
                        </div>

                        <div className="select-payment">
                            <h4 className="section-heading">Select Payment Method</h4>
                            {message ? <Alert type="danger">{message}</Alert> : ''}
                            {
                                paid ? (
                                    <div className="paypal-success">
                                        <p className="heading">PayPal Payment Successful: ${payPalPaidAmount}</p>
                                        <p className="info">Please click the Place Order Button ( on the right) to complete your order</p>
                                    </div>
                                ) : (
                                        sdkReady ? (
                                            <div className="paypal-btn">
                                                <PayPalButton
                                                    amount={cart.totalPrice}
                                                    onSuccess={payPalSuccessPaymentHandler}
                                                />
                                            </div>

                                        ) : <Spinner />

                                    )
                            }


                        </div>
                        {cart.cartItems.length === 0 ? <Alert></Alert>
                            : (
                                <div className="order-info">
                                    <h4 className="section-heading">Order Items </h4>
                                    {cart.cartItems.map(item => {
                                        return <SmallProductItem cart={false} key={item.productId} item={item} showQty={false} />
                                    })
                                    }
                                </div>

                            )
                        }
                    </div>
                    <div className="price-breakdown">
                        <h4 className="section-heading">Order Summary</h4>
                        <PriceSummary obj={cart} />
                        {error && <Alert type="danger">{error}</Alert>}
                        {orderButtonEnabled ? (
                            <div className={`btn btn-dark ${cart.cartItems === 0 ? 'disabled' : ''}`} onClick={placeOrderHandler} >Place Order</div>
                        ) : (
                                <>
                                    <button className="btn btn-dark" disabled>Place Order</button>
                                    <p className="order-help">Enter your payment information before you can complete your order.</p>

                                </>
                            )}
                    </div>
                </div>
            </section>
        </>

    )
}

export default PlaceOrderScreen
