import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { AccountItems } from '../componentsData/AccountItems';
import { CategoryItems } from '../componentsData/CategoryItems';
import { logout } from '../../actions/userActions'
import { AdminItems } from '../componentsData/AdminItems';


function Dropdown({ type, label, sideNavOpen, toggleSideNav }) {
    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()

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
            console.log(`Hello ${label}`)
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    const logoutHandler = () => {
        dispatch(logout())
        setDropdown(false)
        // setMessage('You have been logged out')
    }
    return (
        <>

            { sideNavOpen ? (
                itemsList.map((item, index) => {
                    return <li key={index}>
                        <Link
                            to={item.path}
                            onClick={item.title === "Log Out" ? () => logoutHandler() : () => dispatch(toggleSideNav())}>
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
