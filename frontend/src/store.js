import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import { browserReducer } from './reducers/browserReducers'
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer } from './reducers/orderReducers';
import { productDetailReducer, productsListReducer } from './reducers/productReducers'
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';

const reducer = combineReducers({
    browserState: browserReducer,
    productList: productsListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer
})


// const cartItemsFromStorage = localStorage.getItem('cartItems')
//     ? JSON.parse(localStorage.getItem('cartItems'))
//     : []


let cartItemsFromStorage
let userInfoFromStorage
let shippingAddressFromStorage

if (localStorage.getItem('cartItems') !== "undefined" && localStorage.getItem('cartItems') !== null) {
    cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'))
} else {
    cartItemsFromStorage = []
}
if (localStorage.getItem('userInfo') !== "undefined" && localStorage.getItem('userInfo') !== null) {
    userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo'))
} else {
    userInfoFromStorage = null
}

if (localStorage.getItem('shippingAddress') !== "undefined" && localStorage.getItem('shippingAddress') !== null) {
    shippingAddressFromStorage = JSON.parse(localStorage.getItem('shippingAddress'))
} else {
    shippingAddressFromStorage = null
}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;