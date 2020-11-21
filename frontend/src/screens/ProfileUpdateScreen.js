import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Layout/Alert'
import Spinner from '../components/Layout/Spinner'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileUpdateScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error: userDetailsError, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, error: userUpdateError } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/auth')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (

        <section className="container auth-form">
            <form className="form" onSubmit={submitHandler}>
                <h3 className="form-heading">Update Profile</h3>
                {loading ? (<Spinner />) : (

                    <>
                        {message && <Alert type="danger">{message}</Alert>}
                        {userDetailsError && <Alert type="danger">{userDetailsError}</Alert>}
                        {userUpdateError && <Alert type="danger">{userUpdateError}</Alert>}
                        {success && <Alert type="success">Profile Updated</Alert>}
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
                            <button className="form-submit btn btn-dark" type="submit">Update</button>
                        </span>
                    </>

                )}

            </form>
        </section>
    )
}

export default ProfileUpdateScreen
