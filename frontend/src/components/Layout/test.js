import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideNav } from '../../actions/browserActions'
import Alert from './Alert'
import { logout } from '../../actions/userActions'
import './Navbar.css'

const Navbar = () => {

    const [dropdown, setDropdown] = useState(false)
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState

    const logoutHandler = () => {
        dispatch(logout())
        // setMessage('You have been logged out')
    }

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
            console.log('dropdown')
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="menu-icon" onClick={() => { dispatch(toggleSideNav()) }}>
                        <i className={sideNavOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul class="left-nav">
                        <Link to="/"><h1 className="navbrand">Shop Latania <i class="fas fa-shopping-bag"></i></h1></Link>
                    </ul>
                    <ul className={`right-nav ${sideNavOpen ? 'active' : ''}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <li class="dropdown">
                            <Link to="#" class="dropbtn">Shop By Category<i class="fas fa-sort-down"></i></Link>
                            <div class="dropdown-content">
                                <Link to="">Clothes</Link>
                                <Link to="">Technology</Link>
                                <Link to="">Cosmetics</Link>
                                <Link to="">Home Essentials</Link>
                            </div>
                        </li>
                        {userInfo ? (
                            <li class="dropdown">
                                <Link to="" class="dropbtn">Hi, {userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}<i class="fas fa-sort-down"></i></Link>
                                <div class="dropdown-content">
                                    <Link to="/profile">Edit Profile</Link>
                                    <Link to="" onClick={logoutHandler}>Logout</Link>
                                </div>
                            </li>
                        ) : (
                                <li><Link to="/auth">Sign In</Link></li>

                            )}
                        <li><Link to="/cart">Cart</Link></li>

                    </ul>
                </div>
            </nav>
            {message && <Alert type="info" noMargin="true">{message}</Alert>}
        </>

    )
}

export default Navbar;
