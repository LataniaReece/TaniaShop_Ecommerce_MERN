import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../../actions/actionTypes/userTypes'
import { getUserDetails, updateUser } from '../../actions/userActions'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'



const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: adminUserInfo } = userLogin


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/users')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, dispatch, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        if (userId === adminUserInfo._id) {
            if (window.confirm('THIS IS YOUR ACCOUNT. Are you sure you want to edit YOUR OWN account?')) {
                dispatch(updateUser({ _id: userId, name, email, isAdmin }))
            }
        } else {
            dispatch(updateUser({ _id: userId, name, email, isAdmin }))
        }
    }


    return (
        <section className="container user-edit">
            <Link to="/admin/users" className="btn btn-info go-back">Go Back</Link>
            {user && (
                <>
                    {loading && <Spinner />}
                    {error && <Alert type="danger">{error}</Alert>}
                    <form className="form" onSubmit={(e) => submitHandler(e)}>
                        <h3 className="form-heading">Edit User</h3>
                        {loadingUpdate && <Spinner />}
                        {errorUpdate && <Alert type="danger">{errorUpdate}</Alert>}
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
                        <label className="form-label checkbox">
                            <span>Is Admin?</span>
                            <input
                                className="form-input"
                                type="checkbox"
                                name="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </label>
                        <span>
                            <button className="form-submit btn btn-dark" type="submit">Update</button>
                        </span></form>
                </>
            )
            }
        </section>

    )
}

export default UserEditScreen
