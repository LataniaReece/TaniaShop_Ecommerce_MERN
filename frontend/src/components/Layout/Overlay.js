import React from 'react'
import { useDispatch } from 'react-redux'
import { TOGGLE_SIDENAV } from '../../actions/actionTypes/browserTypes'
import './Overlay.css'

const Overlay = () => {

    const dispatch = useDispatch()

    const overlayClickHandler = () => {
        dispatch({ type: TOGGLE_SIDENAV })
    }

    return (
        <div onClick={overlayClickHandler} className="overlay" />
    )

}
export default Overlay
