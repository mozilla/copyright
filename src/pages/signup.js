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
        <Nav/>
        <Header/>
        <FormBody/>
        <SignupForm/>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
