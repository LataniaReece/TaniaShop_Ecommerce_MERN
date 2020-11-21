import { FIX_BIGSCREEN, TOGGLE_SIDENAV } from '../actions/actionTypes/browserTypes'

export const browserReducer = (
    state = {
        sideNavOpen: false,
    },
    action
) => {
    switch (action.type) {
        case TOGGLE_SIDENAV:
            return {
                ...state,
                sideNavOpen: !state.sideNavOpen
            }
        case FIX_BIGSCREEN:
            return {
                ...state,
                sideNavOpen: false
            }
        default:
            return state
    }

}