import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Alert from '../components/Layout/Alert'
import { createOrder } from '../actions/orderActions'
import { savePaymentMethod } from '../actions/cartActions'

const PlaceOrderScreen = ({ history }) => {
    const [message, setMessage] = useState('')

    const [showPayPalButtons, setShowPayPalButtons] = useState(false)
    const [payPalPaid, setPayPalPaid] = useState(false)
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


    // Refreshes the page after leaving this screen to avoid paypal problems. This removes sdk script at bottom of page. 
    useEffect(() => {
        return () => window.location.reload()
    }, [])

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
        const { data: clientId } = await axios.get('http://localhost:5000/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        console.log(script.src)
        script.async = true
        script.intent = "authorize"
        script.id = "paypal-script"
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    const payPalSelectedHandler = (payPalValue) => {
        console.log('hello')
        setPaymentMethod(payPalValue)
        if (!document.getElementById("paypal-script")) {
            addPayPalScript()
        }
        setShowPayPalButtons(true)
    }

    const nonPayPalSelectedHandler = (nonPayPalValue) => {
        console.log('bye')
        setPaymentMethod(nonPayPalValue)
        setShowPayPalButtons(false)
    }


    const payPalSuccessPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        if (paymentResult.status === "COMPLETED") {
            setPayPalPaidAmount(paymentResult.purchase_units[0].amount.value)
            setPayPalPaid(true)
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
            <CheckoutSteps step1 step2 step3 />
            <section className="container place-order-grid">
                <div className="order-review">

                    <div className="order-info">
                        <h4>Shipping</h4>
                        <p>Address: {cart.shippingAddress.address}. {' '} {cart.shippingAddress.city}, {' '} {cart.shippingAddress.postalCode}, {' '} {cart.shippingAddress.country}</p>
                    </div>

                    <div className="select-payment">
                        <h4>Select Payment Method</h4>
                        {message ? <Alert type="danger">{message}</Alert> : ''}
                        {
                            payPalPaid ? (
                                <div className="paypal-success">
                                    <p className="heading">PayPal Payment Successful: ${payPalPaidAmount}</p>
                                    <p className="info">Please click the Place Order Button ( on the right) to complete your order</p>
                                </div>
                            ) : (
                                    <div className="pay-content">
                                        <form className="form">
                                            <label for="PayPal">PayPal</label>
                                            <input
                                                type="radio"
                                                id="PayPal"
                                                name="paymentMethod"
                                                value="PayPal"
                                                onChange={(e) => payPalSelectedHandler(e.target.value)}
                                            />
                                            <label for="Stripe">Stripe</label>
                                            <input
                                                type="radio"
                                                id="Stripe"
                                                name="paymentMethod"
                                                value="Stripe"
                                                onChange={(e) => nonPayPalSelectedHandler(e.target.value)}
                                            />
                                        </form>
                                        {sdkReady ? (
                                            <div className={showPayPalButtons ? "paypal-btn" : "paypal-btn hide"}>
                                                <PayPalButton
                                                    amount={cart.totalPrice}
                                                    onSuccess={payPalSuccessPaymentHandler}
                                                />
                                            </div>

                                        ) : ''}
                                    </div>

                                )
                        }


                    </div>
                    {cart.cartItems.length === 0 ? <Alert></Alert>
                        : (
                            <div className="order-info">
                                <h4>Order Items </h4>
                                {cart.cartItems.map((item, index) => {
                                    return <div className="item" key={index}>
                                        <Link to={`/product/${item.productId}`} className="img-link"><img src={item.image} alt="" /></Link>
                                        <Link to={`/product/${item.productId}`} className="title"><p >{item.name}</p></Link>
                                        <p className="item-price">{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                                    </div>

                                })}
                            </div>

                        )
                    }
                </div>

                <div className="order-payment-summary">
                    <h4>Order Summary</h4>
                    <div className="price-summary">
                        <p className="price-type">Items: </p>
                        <p className="price">${cart.itemsPrice}</p>
                    </div>
                    <div className="price-summary">
                        <p className="price-type">Shipping: </p>
                        <p className="price">${cart.shippingPrice}</p>
                    </div>
                    <div className="price-summary">
                        <p className="price-type">Tax: </p>
                        <p className="price">${cart.taxPrice}</p>
                    </div>
                    <div className="price-summary">
                        <p className="price-type">Total: </p>
                        <p className="price">${cart.totalPrice}</p>
                    </div>
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
            </section>
        </>

    )
}

export default PlaceOrderScreen
