import React  from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import Nav from '../components/nav.js';
import SignupForm from '../components/signup-form.js';
import FormBody from '../components/form-body.js';

var Signup = React.createClass({
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <div id="about" className="nav-anchor nav-offset"></div>
          <Nav signupDomain=""/>
          <Header signupDomain=""/>
          <div className="signup-container">
            <FormBody/>
            <SignupForm/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
