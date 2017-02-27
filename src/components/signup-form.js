import React from 'react';
import { FormattedMessage } from 'react-intl';
import { setEmailError, setEmail, setFirstName, setLastName, setCountry } from '../actions';
import { connect } from 'react-redux';

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  firstNameChange: function(e) {
    this.props.setFirstName(e.target.value);
  },
  lastNameChange: function(e) {
    this.props.setLastName(e.target.value);
  },
  emailChange: function(e) {
    this.props.setEmail(e.target.value);
  },
  countryChange: function(e) {
    this.props.setCountry(e.target.value);
  },
  render: function() {
    return (
      <div className="signup-form-container">
        <div id="get-involved" className="nav-anchor nav-offset"></div>
        <div className="signup-form">
          <h3>
            {this.context.intl.formatMessage({id: 'take_action_headline'})}
          </h3>
          <p>
            {this.context.intl.formatMessage({id: 'take_action_description'})}
          </p>
          <input value={this.props.firstName} onChange={this.firstNameChange} placeholder={this.context.intl.formatMessage({id: 'first_name'})}/>
          <input value={this.props.lastName} onChange={this.lastNameChange} placeholder={this.context.intl.formatMessage({id: 'last_name'})}/>
          <input value={this.props.email} onChange={this.emailChange} type="email" required placeholder={this.context.intl.formatMessage({id: 'email'})}/>
          <input value={this.props.country} onChange={this.countryChange} placeholder={this.context.intl.formatMessage({id: 'country'})}/>
          <p className="privacy-policy">
            <FormattedMessage
              id='sign_up_notice'
              values={{
                linkTerms: (<a href="#">{this.context.intl.formatMessage({id: 'link_tos'})}</a>),
                linkPrivacyPolicy: (<a href="#">{this.context.intl.formatMessage({id: 'link_pp'})}</a>)
              }}
            />
          </p>
          <button className="button">
            {this.context.intl.formatMessage({id: 'sign_up_button'})}
          </button>
        </div>
      </div>
    );
  }
});

module.exports = connect(
function(state) {
  return {
    email: state.signupForm.email,
    emailError: state.signupForm.emailError,
    firstName: state.signupForm.firstName,
    lastName: state.signupForm.lastName,
    country: state.signupForm.country
  };
},
function(dispatch) {
  return {
    setEmailError: function(data) {
      dispatch(setEmailError(data));
    },
    setEmail: function(data) {
      dispatch(setEmail(data));
    },
    setFirstName: function(data) {
      dispatch(setFirstName(data));
    },
    setLastName: function(data) {
      dispatch(setLastName(data));
    },
    setCountry: function(data) {
      dispatch(setCountry(data));
    }
  };
})(Signup);
