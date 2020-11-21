import React from 'react'

const Spinner = () => (
    <>
        <img src={require('./spinner.gif')}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt="Loading..."
        />
    </>
)

export default Spinner
