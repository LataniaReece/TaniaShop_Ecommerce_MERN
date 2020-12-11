import React, { useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideNav } from '../../actions/browserActions'
// import Alert from './Alert'
import Dropdown from './Dropdown'
import './Navbar.css'
import SearchBox from '../SearchBox';

const Navbar = () => {

    // const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState

    useEffect(() => {
        if (document.querySelector('.right-nav.active')) {
            document.body.classList.add('fixed')
        } else if (!document.querySelector('.right-nav.active')) {
            document.body.classList.remove('fixed')
        }

    }, [sideNavOpen])

    const onClickHandler = () => {
        if (sideNavOpen) {
            dispatch(toggleSideNav())
        }
    }

    return (
        <>
            <nav className={sideNavOpen ? 'navbar active' : 'navbar'}>
                <div div className="container">

                    <div className="menu-icon" onClick={() => { dispatch(toggleSideNav()) }}>
                        <i className={sideNavOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                    <ul className="left-nav">
                        <Link to="/" onClick={onClickHandler}><h1 className="navbrand">Shop Latania</h1></Link>
                    </ul>

                    {/* This is what is shown when the sidebar is open - no dropdowns */}
                    {sideNavOpen ? (
                        <ul className='right-nav active'>
                            <Route render={({ history }) => <SearchBox history={history} />} />
                            <Dropdown
                                type="category"
                                sideNavOpen={sideNavOpen}
                                toggleSideNav={toggleSideNav}
                            />

                            {
                                userInfo.isAdmin && <Dropdown
                                    type="admin"
                                    sideNavOpen={sideNavOpen}
                                    toggleSideNav={toggleSideNav}
                                />

                            }
                            {
                                userInfo ? <Dropdown
                                    type="account"
                                    sideNavOpen={sideNavOpen}
                                    toggleSideNav={toggleSideNav}
                                /> : <li><Link to="/auth" onClick={() => dispatch(toggleSideNav())}>Sign In</Link></li>

                            }
                            <li><Link to="/cart" onClick={onClickHandler}>Cart</Link></li>

                        </ul>
                    ) : (
                            <ul className='right-nav'>
                                {/* Here are the dropdowns */}

                                <Route render={({ history }) => <SearchBox history={history} />} />


                                <Dropdown type="category" label="Shop By Category" />

                                {userInfo ? (
                                    <Dropdown type="account" label={`${userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}'s Account`} />

                                ) : <li><Link to="/auth">Sign In</Link></li>
                                }

                                { userInfo && userInfo.isAdmin && (
                                    <Dropdown type="admin" label="Admin" />
                                )}

                                <li><Link to="/cart">Cart</Link></li>
                            </ul>
                        )
                    }
                </div>
            </nav>
        </>

    )
}

export default Navbar;
