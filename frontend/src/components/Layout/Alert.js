import React from 'react'

const Alert = ({ type, noMargin, children }) => {
    return (
        <div class={`alert alert-${type}`} style={noMargin && { margin: "0px" }}>
            <p class="container">{children}</p>
        </div>
    )
}

export default Alert
