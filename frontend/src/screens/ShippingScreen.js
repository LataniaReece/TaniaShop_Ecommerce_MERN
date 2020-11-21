import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress !== null ? shippingAddress.address : '')
    const [city, setCity] = useState(shippingAddress !== null ? shippingAddress.city : '')
    const [postalCode, setPostalCode] = useState(shippingAddress !== null ? shippingAddress.postalCode : '')
    const [country, setCountry] = useState(shippingAddress !== null ? shippingAddress.country : '')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/placeorder')
    }

    return (
        <section className="container auth-form">
            <CheckoutSteps step1 step2 />
            <form className="form" onSubmit={submitHandler}>
                <h3 className="form-heading">Shipping</h3>
                <label className="form-label">Address</label>
                <input
                    className="form-input"
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label className="form-label">City</label>
                <input
                    className="form-input"
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className="form-label">Postal Code</label>
                <input
                    className="form-input"
                    type="text"
                    name="postalCode"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
                <label className="form-label">Country</label>
                <input
                    className="form-input"
                    type="text"
                    name="country"
                    placeholder="Confirm country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <span>
                    <button className="form-submit btn btn-dark" type="submit">Continue</button>
                </span>
            </form>
        </section>

    )
}

export default ShippingScreen
