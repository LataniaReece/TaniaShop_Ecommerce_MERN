import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Layout/Alert'
import { login } from '../actions/userActions'


const LoginScreen = ({ location, history }) => {
    // Login Stuff
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { error } = userLogin

    // const redirect = location.search ? location.search.split('=')[1] : '/'


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <h3 className="form-heading">Sign In</h3>
            {error && <Alert type="danger">{error}</Alert>}
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
            <span>
                <button className="form-submit btn btn-dark" type="submit">Login</button>
            </span>
        </form>
    )
}

export default LoginScreen
