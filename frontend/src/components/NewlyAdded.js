import React from 'react'
import { Link } from 'react-router-dom'

const NewlyAdded = () => {
    return (
        <section className="newly-added" style={{ width: "100%" }} >
            <div className="text">
                <h2>New</h2>
                <h3>Arrivals</h3>
            </div>
            <Link to="/products/recent" className="btn btn-primary"> View New Items </Link>
        </section >

    )
}

export default NewlyAdded
