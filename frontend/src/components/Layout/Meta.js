import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Shop Latania',
    description: 'Shop all items that Latania is giving away!',
    keywords: 'Selling, cheap items, cheap products, Latania, cheap'
}


export default Meta
