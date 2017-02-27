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
          <input autoComplete="off" type='text' value={this.props.firstName} onChange={this.firstNameChange} placeholder={this.context.intl.formatMessage({id: 'first_name'})}/>
          <input autoComplete="off" type='text' value={this.props.lastName} onChange={this.lastNameChange} placeholder={this.context.intl.formatMessage({id: 'last_name'})}/>
          <input autoComplete="off" type='email' value={this.props.email} onChange={this.emailChange} required placeholder={this.context.intl.formatMessage({id: 'email'})}/>
          <select autoComplete="off" required value={this.props.country} onChange={this.countryChange}>
            <option value="">{this.context.intl.formatMessage({id: 'country'})}</option>
            <option value="AT">Austria</option>
            <option value="BE">Belgium</option>
            <option value="BG">Bulgaria</option>
            <option value="HR">Croatia</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="EE">Estonia</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="GR">Greece</option>
            <option value="HU">Hungary</option>
            <option value="IE">Ireland</option>
            <option value="IT">Italy</option>
            <option value="LV">Latvia</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MT">Malta</option>
            <option value="NL">Netherlands</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="RO">Romania</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="ES">Spain</option>
            <option value="SE">Sweden</option>
            <option value="GB">United Kingdom</option>
            <option value="other" data-other="">Other</option>
          </select>
          <p className="privacy-policy">
            <FormattedMessage
              id='sign_up_notice'
              values={{
                linkTerms: (<a href="https://www.mozilla.org/en-US/about/legal/terms/mozilla/">{this.context.intl.formatMessage({id: 'link_tos'})}</a>),
                linkPrivacyPolicy: (<a href="https://www.mozilla.org/privacy/">{this.context.intl.formatMessage({id: 'link_pp'})}</a>)
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
