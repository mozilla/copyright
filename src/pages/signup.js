import React  from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';

var Signup = React.createClass({
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <Header/>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
