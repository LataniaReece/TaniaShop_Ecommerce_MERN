import React from 'react'
import Meta from '../components/Layout/Meta'
import NewlyAdded from '../components/NewlyAdded'
import TopRated from '../components/TopRated'

const HomeScreen = () => {
    return (
        <>
            <Meta />
            <NewlyAdded />
            <TopRated />
        </>
    )
}

export default HomeScreen
