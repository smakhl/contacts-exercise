import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Listing from './Listing';
import SingleListing from './SingleListing';
const Main = () => (
  <Router>
    <div className="wrapper">
     <Header />
      <Route exact path="/" component={Listing} />
      <Route path="/list" component={SingleListing} />
      <Footer />
    </div>
  </Router>
);

export default Main;