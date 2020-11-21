import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

import { Provider } from 'react-redux';
import store from './store'

import { fixBigScreen } from './actions/browserActions'

import './app.css';
import './utilities.css';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';
import ShippingScreen from './screens/ShippingScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import AuthScreen from './screens/AuthScreen';
import ThankYouScreen from './screens/ThankYouScreen';
import AccountScreen from './screens/AccountScreen';
import AccountUpdateScreen from './screens/AccountUpdateScreen';


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
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/auth' component={AuthScreen} />
        <Route path='/account' component={AccountScreen} />
        <Route path='/accountupdate' component={AccountUpdateScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/order/thankyou/:id' component={ThankYouScreen} />
      </section>
      <Footer />
    </Router>

  );
}


export default AppWrapper;
