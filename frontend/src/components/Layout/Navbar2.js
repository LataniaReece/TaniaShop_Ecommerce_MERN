import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideNav } from '../../actions/browserActions'
// import Alert from './Alert'
import { AccountItems } from '../componentsData/AccountItems';
import { CategoryItems } from '../componentsData/CategoryItems';
import Dropdown from './Dropdown'
import { logout } from '../../actions/userActions'
import './Navbar.css'

const Navbar = () => {

    // const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(toggleSideNav())
        // setMessage('You have been logged out')
    }

    useEffect(() => {
        console.log(sideNavOpen)
    }, [sideNavOpen])

    return (
        <>
            <nav className="navbar">
                <div className="container">

                    <div className="menu-icon" onClick={() => { dispatch(toggleSideNav()) }}>
                        <i className={sideNavOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>

                    <ul className="left-nav">
                        <Link to="/"><h1 className="navbrand">Shop Latania <i className="fas fa-shopping-bag"></i></h1></Link>
                    </ul>

                    {sideNavOpen ? (
                        <ul className='right-nav active'>
                            {CategoryItems.map((item, index) => {
                                return <li key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={() => dispatch(toggleSideNav())}
                                    >{item.title}
                                    </Link>
                                </li>
                            })}
                            {AccountItems.map((item, index) => {
                                return <li key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={item.title === "Log Out" ? logoutHandler() : () => dispatch(toggleSideNav())}>
                                        {item.title}
                                    </Link>
                                </li>
                            })
                            }
                        </ul>

                    ) : (
                            <ul className='right-nav'>
                                <Dropdown type="category" label="Shop By Category" />
                                {userInfo ? (
                                    <Dropdown type="account" label={`Hi, ${userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}`} />
                                ) : (
                                        <li><Link to="/auth">Sign In</Link></li>
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
