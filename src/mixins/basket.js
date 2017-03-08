import React from 'react';
import reactGA from 'react-ga';
import submit from '../lib/submit';

var NOT_SUBMITTING = 0;
var SIGNUP_SUBMITTING = 1;

var BasketMixin = {
  contextTypes: {
    intl: React.PropTypes.object
  },
  doSignupSuccess: function(result, location) {
    reactGA.event({
      category: "Signup",
      action: "Submitted the form",
      label: "copyright"
    });
    var page = location;
    window.location = page;
  },
  signupError: function(result) {
    this.setState({
      submitting: NOT_SUBMITTING,
      signupError: this.context.intl.formatMessage({id: 'try_again_later'})
    });
  },
  doSignup: function(url, props, success, error) {
    this.setState({
      submitting: SIGNUP_SUBMITTING,
      signupError: ""
    });
    props.locale = this.context.intl.locale;
    submit(url, props, success, error);
  },
  signupSuccess: function(result) {
    var shareLink = "/" + this.context.intl.locale + "/share";
    if (/^(en)(\b|$)/.test(this.context.intl.locale)) {
      shareLink = "http://share.mozilla.org/352/179362";
    }
    this.doSignupSuccess(result, shareLink);
  },
  basket: function(props) {
    this.doSignup("/api/signup/basket", props, this.signupSuccess, this.signupError);
  }
};

module.exports = BasketMixin;

