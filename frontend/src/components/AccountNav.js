import React from 'react'
import { Link } from 'react-router-dom'

const AccountNav = () => {
    return (
        <div class="profile-nav">
            <Link class="btn btn-light" to="/account">My Orders</Link>
            <Link class="btn btn-light" to="/accountupdate">Update Account</Link>
        </div>
    )
}

export default AccountNav
