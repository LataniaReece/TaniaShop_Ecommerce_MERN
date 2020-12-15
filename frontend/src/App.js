import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store'

import Overlay from './components/Layout/Overlay';
import Navbar from './components/Layout/Navbar';
import SideNav from './components/Layout/SideNav';
import Footer from './components/Layout/Footer';


import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/products/ProductScreen';
import CartScreen from './screens/orders/CartScreen';

import ShippingScreen from './screens/orders/ShippingScreen';
import PlaceOrderScreen from './screens/orders/PlaceOrderScreen';
import AuthScreen from './screens/user/AuthScreen';
import ThankYouScreen from './screens/orders/ThankYouScreen';
import AccountScreen from './screens/user/AccountScreen';
import AccountUpdateScreen from './screens/user/AccountUpdateScreen';
import CategoryScreen from './screens/products/CategoryScreen';
import OrderDetailsScreen from './screens/orders/OrderDetailsScreen';
import AllProductsScreen from './screens/products/AllProductsScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import RecentProductsScreen from './screens/products/RecentProductsScreen';
import { FIX_BIGSCREEN } from './actions/actionTypes/browserTypes';

import './app.css';
import './utilities.css';


const AppWrapper = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const browserState = useSelector(state => state.browserState)
  const { sideNavOpen } = browserState

  const dispatch = useDispatch()

  // Screen resize
  const handleResize = useCallback(() => {
    if (window.innerWidth > 1145) {
      dispatch({ type: FIX_BIGSCREEN })
    }
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize])


  // Fixed body logic
  useEffect(() => {
    if (document.querySelector('.sidenav.active')) {
      document.body.classList.add('fixed')
      document.getElementsByTagName('html')[0].classList.add('fixed')
    } else if (!document.querySelector('.sidenav.active')) {
      document.body.classList.remove('fixed')
      document.getElementsByTagName('html')[0].classList.remove('fixed')
    }


  }, [sideNavOpen])

  // Overlay logic
  let overlay;

  if (sideNavOpen) {
    overlay = <Overlay />
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Router>
        <Navbar />
        <SideNav />
        {overlay}
        <Route path='/' component={HomeScreen} exact />
        <Route path='/products' component={AllProductsScreen} exact />
        <Route path='/products/page/:pageNumber' component={AllProductsScreen} exact />
        <Route path='/products/recent' component={RecentProductsScreen} exact />
        <Route path='/products/recent/page/:pageNumber' component={RecentProductsScreen} exact />
        <Route path='/search/:keyword' component={AllProductsScreen} exact />
        <Route path='/search/:keyword/page/:pageNumber' component={AllProductsScreen} exact />
        <Route path='/product/category/:category' component={CategoryScreen} exact />
        <Route path='/product/category/:category/page/:pageNumber' component={CategoryScreen} exact />
        <Route path='/product/:id' component={ProductScreen} exact />
        <Route path='/cart/:id?' component={CartScreen} exact />
        <Route path='/auth' component={AuthScreen} exact />
        <Route path='/account' component={AccountScreen} exact />
        <Route path='/accountupdate' component={AccountUpdateScreen} exact />
        <Route path='/shipping' component={ShippingScreen} exact />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/order/thankyou/:id' component={ThankYouScreen} exact />
        <Route path='/order/:id' component={OrderDetailsScreen} exact />
        <Route path='/admin/users' component={UserListScreen} exact />
        <Route path='/admin/users/page/:pageNumber' component={UserListScreen} exact />
        <Route path='/admin/users/:id/edit' component={UserEditScreen} exact />
        <Route path='/admin/products' component={ProductListScreen} exact />
        <Route path='/admin/products/page/:pageNumber' component={ProductListScreen} exact />
        <Route path='/admin/products/:id/edit' component={ProductEditScreen} exact />
        <Route path='/admin/orders' component={OrderListScreen} exact />
        <Route path='/admin/orders/page/:pageNumber' component={OrderListScreen} exact />
        <Footer />
      </Router>
    </div >
  );
}


export default AppWrapper;
