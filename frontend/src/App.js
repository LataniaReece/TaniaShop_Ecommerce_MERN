import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/products/ProductScreen';
import CartScreen from './screens/orders/CartScreen';

import { Provider } from 'react-redux';
import store from './store'

import { fixBigScreen } from './actions/browserActions'

import './app.css';
import './utilities.css';
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


const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const dispatch = useDispatch()

  const handleResize = useCallback(() => {
    if (window.innerWidth > 960) {
      dispatch(fixBigScreen())
    }
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize])

  return (
    <Router>
      <Navbar />
      <section className='content'>
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
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/auth' component={AuthScreen} />
        <Route path='/account' component={AccountScreen} />
        <Route path='/accountupdate' component={AccountUpdateScreen} />
        <Route path='/shipping' component={ShippingScreen} />
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
      </section>
      <Footer />
    </Router>

  );
}


export default AppWrapper;
