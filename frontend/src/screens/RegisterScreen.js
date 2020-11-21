import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Layout/Alert'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error } = userRegister

    // const redirect = location.search ? location.search.split('=')[1] : '/'


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <h3 className="form-heading">Sign Up</h3>
            {message && <Alert type="danger">{message}</Alert>}
            {error && <Alert type="danger">{error}</Alert>}
            <label className="form-label">Name</label>
            <input
                className="form-input"
                type="name"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Email Address</label>
            <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label">Password</label>
            <input
                className="form-input"
                type="Password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label">Confirm Password</label>
            <input
                className="form-input"
                type="Password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>
                <button className="form-submit btn btn-dark" type="submit">Register</button>
            </span>
        </form>
    )
}

export default RegisterScreen
