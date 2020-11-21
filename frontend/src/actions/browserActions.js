import { FIX_BIGSCREEN, TOGGLE_SIDENAV } from './actionTypes/browserTypes'

// Toggle Sidenav 

export const toggleSideNav = () => dispatch => {
    dispatch({ type: TOGGLE_SIDENAV })
}

export const fixBigScreen = () => dispatch => {
    dispatch({ type: FIX_BIGSCREEN })
}