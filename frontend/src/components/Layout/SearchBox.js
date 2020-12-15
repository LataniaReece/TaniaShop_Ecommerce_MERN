import React, { useState } from 'react'
import './SearchBox.css'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
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
