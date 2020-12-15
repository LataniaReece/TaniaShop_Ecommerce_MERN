import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountNav from '../../components/AccountNav'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'
import { listMyOrders } from '../../actions/orderActions'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'



const AccountUpdateScreen = ({ history }) => {

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
            history.push('/auth?redirect=account')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

        dispatch(listMyOrders())
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
        <>
            {userInfo ? (
                loading ? <Spinner /> : (
                    <section class="profile container">
                        <div className="main-content">
                            <h1 class="header">{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}'s Account</h1>
                            <div class="info">
                                <AccountNav />
                                <hr width="1" size="500" />
                                <div className="edit-profile">
                                    {message && <Alert type="danger">{message}</Alert>}
                                    {userDetailsError && <Alert type="danger">{userDetailsError}</Alert>}
                                    {userUpdateError && <Alert type="danger">{userUpdateError}</Alert>}
                                    {success && <Alert type="success">Profile Updated</Alert>}
                                    <form className="form" onSubmit={submitHandler}>
                                        <h3 className="form-heading">Update Account</h3>
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
                                        </span></form>
                                </div>

                            </div>
                        </div>
                    </section>
                )

            ) : ''
            }

        </>
    )
}

export default AccountUpdateScreen
