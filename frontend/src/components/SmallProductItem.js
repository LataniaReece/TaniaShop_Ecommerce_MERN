import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'

const SmallProductItem = ({ item, cart, showQty }) => {

    const dispatch = useDispatch()

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    return (

        <div className="cart-card">
            <Link to={`/product/${item.productId}`} className="img-link"><img src={item.image} alt="" /></Link>
            <Link to={`/product/${item.productId}`} className="name-link"><h4 className="name">{item.name}</h4></Link>
            {
                showQty && (
                    <form>
                        {
                            cart ? (
                                <>
                                    <label for="qty"><strong>Qty:</strong></label>
                                    <select name="qty" id="qty" value={item.qty} onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                    </select>
                                </>
                            ) : (
                                    <p class="quantity"><strong>Qty:</strong>{item.qty}</p>
                                )
                        }

                    </form>
                )
            }
            <p className="price">${item.price.toFixed(2)} x {item.qty} = <strong>${(item.price * item.qty).toFixed(2)}</strong></p>
            { cart ? (<button className="remove-item" onClick={() => removeFromCartHandler(item.productId)}><i className="fa fa-trash" aria-hidden="true"></i></button>) : ''}
        </div>

    )
}

export default SmallProductItem
