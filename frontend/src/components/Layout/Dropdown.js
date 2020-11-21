import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { AccountItems } from '../componentsData/AccountItems';
import { CategoryItems } from '../componentsData/CategoryItems';
import { logout } from '../../actions/userActions'


function MyDropdown1({ type, label }) {
    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()

    let itemsList
    if (type === "category") {
        itemsList = CategoryItems
    } else if (type === "account") {
        itemsList = AccountItems
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
    );
}

export default MyDropdown1;
