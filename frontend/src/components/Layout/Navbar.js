import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { TOGGLE_SIDENAV } from '../../actions/actionTypes/browserTypes'
import SearchBox from './SearchBox'
import Dropdown from './Dropdown'
import './Navbar.css'

const Navbar = () => {

    const dispatch = useDispatch()

    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const sideNavClickHandler = () => {
        dispatch({ type: TOGGLE_SIDENAV })
    }

    return (
        <header className="navbar">
            <nav className="navbar__navigation container">
                <div className="navbar__menu-icon" onClick={sideNavClickHandler}> <i className="fas fa-bars"></i> </div>
                <div className="navbar__left-nav">
                    <div className="navbar__logo"><a href="/">Shop Latania</a></div>
                </div>
                <div className="spacer" />


                <div className="navbar__right-nav big-nav">
                    <ul>

                        <Route render={({ history }) => <SearchBox history={history} />} />


                        <Dropdown type="category" label="Shop By Category" />

                        {userInfo ? (
                            <Dropdown type="account" label={`${userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}'s Account`} />

                        ) : <li><Link to="/auth">Sign In</Link></li>
                        }

                        {userInfo && userInfo.isAdmin && (
                            <Dropdown type="admin" label="Admin" />
                        )}

                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>

                <div className="navbar__right-nav small-nav">
                    <ul>

                        {userInfo ? (
                            <Dropdown
                                type="account"
                                label={`${userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}'s Account`}
                                spreadNav={true}
                            />

                        ) : <li><Link to="/auth">Sign In</Link></li>
                        }

                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}

export default Navbar
