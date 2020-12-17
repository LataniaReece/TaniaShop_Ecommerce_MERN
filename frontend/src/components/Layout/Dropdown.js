import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { AccountItems } from '../componentsData/AccountItems';
import { CategoryItems } from '../componentsData/CategoryItems';
import { logout } from '../../actions/userActions'
import { AdminItems } from '../componentsData/AdminItems';
import { TOGGLE_SIDENAV } from '../../actions/actionTypes/browserTypes';


function Dropdown({ type, label, spreadNav = false }) {
    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()

    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState

    let itemsList
    switch (type) {
        case "category":
            itemsList = CategoryItems
            break
        case "account":
            itemsList = AccountItems
            break
        case "admin":
            itemsList = AdminItems
            break
        default:
            itemsList = ""
            break
    }

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    const handleClick = () => {
        if (sideNavOpen) {
            dispatch({ type: TOGGLE_SIDENAV })
        }
    }

    const logoutHandler = () => {
        dispatch(logout())
        setDropdown(false)
        // setMessage('You have been logged out')
    }
    return (
        <>

            { (sideNavOpen || spreadNav) ? (
                itemsList.map((item, index) => {
                    return <li key={index}>
                        <Link
                            to={item.path}
                            onClick={item.title === "Log Out" ? () => logoutHandler() : handleClick}>
                            {item.title}
                        </Link>
                    </li>
                })

            ) : (
                    <li className="dropdown" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Link to="#" className="dropbtn">{label}<i className="fas fa-sort-down"></i></Link>
                        <div className={`dropdown-content ${dropdown ? 'active' : ''}`}>
                            {
                                itemsList.map((item, index) => {
                                    return <Link key={index} to={item.path} onClick={item.title === 'Log Out' ? logoutHandler : () => setDropdown(false)}>{item.title}</Link>
                                })
                            }
                        </div>
                    </li>
                )}
        </>

    );
}

export default Dropdown;
