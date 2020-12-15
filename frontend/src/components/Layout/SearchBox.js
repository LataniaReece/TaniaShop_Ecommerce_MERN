import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_SIDENAV } from '../../actions/actionTypes/browserTypes'
import './SearchBox.css'

const SearchBox = ({ history }) => {

    const dispatch = useDispatch()

    const browserState = useSelector(state => state.browserState)
    const { sideNavOpen } = browserState

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (sideNavOpen) {
            dispatch({ type: TOGGLE_SIDENAV })
        }
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <li className="search-container">
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Search Products..."
                    name="search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        </li>
    )
}

export default SearchBox
