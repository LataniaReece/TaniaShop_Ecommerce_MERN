import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'

import Alert from '../components/Layout/Alert'
import CartProductItem from '../components/CartProductItem'

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const checkOutHandler = () => {
        history.push('/auth?redirect=shipping')
    }

    return (
        <>
            {
                cartItems.length === 0 ? (
                    <Alert type="info"> Your Cart Is empty. <Link to="/" className=" btn btn-sm btn-primary continue-shopping-alert-link">Continue Shopping</Link> </Alert>
                ) : (
                        <section className="container shopping-cart">
                            <div className="cart-items">
                                <h2>Your Bag</h2>
                                {cartItems.map(item => {
                                    return <CartProductItem key={item.productId} item={item} />
                                })
                                }
                            </div>
                            <div className="cart-info">
                                <h3 className="subtotal-heading">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items</h3>
                                <h5 className="total-price">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h5>
                                <button className="btn btn-dark" disabled={cartItems.length === 0} onClick={checkOutHandler}>Proceed To Checkout</button>
                            </div>
                        </section>
                    )
            }
        </>

    )
}

export default CartScreen
