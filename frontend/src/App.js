import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' component={HomeScreen} exact />
      <Route path='/product/:id' component={ProductScreen} />
      <Footer />
    </Router>
  );
}

export default App;
