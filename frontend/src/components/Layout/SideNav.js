import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { TOGGLE_SIDENAV } from '../../actions/actionTypes/browserTypes'
import Dropdown from './Dropdown'
import SearchBox from './SearchBox'
import './SideNav.css'

const SideNav = () => {

    const dispatch = useDispatch()

    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const closeSidenavHandler = () => {
        dispatch({ type: TOGGLE_SIDENAV })
    }

    return (
        <nav className={sideNavOpen ? 'sidenav active' : 'sidenav'}>
            <div className="side-nav-header">
                <div className="navbar__logo"><a href="/">Shop Latania</a></div>
                <div className="close-sidenav" onClick={closeSidenavHandler}><i className="fas fa-times"></i></div>

            </div>
            <ul>
                <Route render={({ history }) => <SearchBox history={history} />} />
                <Dropdown
                    type="category"
                    sideNavOpen={sideNavOpen}
                />

                {
                    (userInfo && userInfo.isAdmin) && <Dropdown
                        type="admin"
                        sideNavOpen={sideNavOpen}
                    />

                }
                {
                    userInfo ? <Dropdown
                        type="account"
                        sideNavOpen={sideNavOpen}
                    /> : <li><Link to="/auth" onClick={() => dispatch({ type: TOGGLE_SIDENAV })}>Sign In</Link></li>

                }
                <li><Link to="/cart" onClick={closeSidenavHandler}>Cart</Link></li>
            </ul>
        </nav>
    )
}

export default SideNav
