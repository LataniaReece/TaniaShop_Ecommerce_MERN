import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


// "Conditional rendering". If home page, display this. If not home page display that...
const Header = () => {
    // const [pageName, setPageName] = useState({''})

    // useEffect(() => {
    //     setPageName(window.location.pathname)
    // }, [])
    return (
        <div className="navbar nav2">
            <div className="container flex">
                <Link to="/"><h1 className="logo">Tania's Shop</h1></Link>
                <nav>
                    <ul>
                        <li className="dropdown">
                            <a href="#" className="dropbtn">Shop By Category<i className="fas fa-sort-down"></i></a>
                            <div className="dropdown-content">
                                <a href="#">Clothes</a>
                                <a href="#">Technology</a>
                                <a href="#">Cosmetics</a>
                                <a href="#">Home Essentials</a>
                            </div>
                        </li>
                        <li><a href="#"><i className="fas fa-sign-in-alt"></i>Sign In</a></li>
                        <li><a href="#"><i className="fas fa-shopping-cart"></i>Cart</a></li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header
