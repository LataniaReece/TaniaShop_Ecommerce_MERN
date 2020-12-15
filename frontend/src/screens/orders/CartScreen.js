import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../actions/cartActions'
import Alert from '../../components/Layout/Alert'
import SmallProductItem from '../../components/SmallProductItem'
import Meta from '../../components/Layout/Meta'

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
                    <section className="cart-alert container">
                        <div className="main-content">
                            <Alert type="info"> Your Cart is empty. <Link to="/" className="alert-link">Continue Shopping</Link> </Alert>
                        </div>
                    </section>
                ) : (
                        <>
                            <Meta title='Cart' />
                            <section className=" container">
                                <div className="main-content shopping-cart">
                                    <div className="cart-items">
                                        <h2>Your Bag</h2>
                                        {cartItems.map(item => {
                                            return <SmallProductItem cart={true} key={item.productId} item={item} showQty={true} />
                                        })
                                        }
                                    </div>
                                    <div className="cart-info">
                                        <h3 className="subtotal-heading">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items: </h3>
                                        <h5 className="total-price">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h5>
                                        <button className="btn btn-dark" disabled={cartItems.length === 0} onClick={checkOutHandler}>Proceed To Checkout</button>
                                    </div>
                                </div>
                            </section>
                        </>
                    )
            }
        </>

    )
}

export default CartScreen
