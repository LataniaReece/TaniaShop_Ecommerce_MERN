import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import { browserReducer } from './reducers/browserReducers'
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer } from './reducers/orderReducers';
import { productCreateReducer, productDeleteReducer, productDetailReducer, productReviewCreateReducer, productsListByCategoryReducer, productsListReducer, productsRecentListReducer, productTopReducer, productUpdateReducer } from './reducers/productReducers'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from './reducers/userReducers';

const reducer = combineReducers({
    browserState: browserReducer,
    productList: productsListReducer,
    productRecentList: productsRecentListReducer,
    productCategoryList: productsListByCategoryReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopList: productTopReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
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