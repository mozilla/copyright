import React  from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import { SimpleNav } from '../components/nav.js';

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <SimpleNav/>
          <div className="share-page-container">
            <div className="share-page">

            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
