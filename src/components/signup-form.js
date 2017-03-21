import React from 'react';
import { FormattedMessage } from 'react-intl';
import { setEmailError, setEmail, setFirstName, setLastName, setCountry, setSignupCheckbox, setSignupCheckboxError, setPrivacyCheckbox, setPrivacyCheckboxError } from '../actions';
import { connect } from 'react-redux';
import classnames from "classnames";
import StickyContainer from './sticky-container.js';
import reactGA from 'react-ga';

var NOT_SUBMITTING = 0;
var SIGNUP_SUBMITTING = 1;

var Signup = React.createClass({
  mixins: [require('../mixins/basket.js')],
  contextTypes: {
    intl: React.PropTypes.object,
    localizedCountries: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      signupError: "",
      submitting: NOT_SUBMITTING,
      formTop: 0
    };
  },
  componentDidMount: function() {
    document.addEventListener(`scroll`, this.onScroll);
    setTimeout(this.onScroll);
  },
  componentWillUnmount: function() {
    document.removeEventListener(`scroll`, this.onScroll);
  },
  onScroll: function() {
    if (window.innerWidth <= 992 ) {
      return;
    }
    var formTop = 0;
    var viewportPadding = 30;
    var navHeight = 64;
    var formBottomPadding = 144;
    var topPadding = viewportPadding + navHeight;
    var formHeight = this.formElement.offsetHeight;
    var formPaddingHeight = formHeight + formBottomPadding;
    var formViewHeight = formHeight + viewportPadding;
    var windowHeight = window.innerHeight;
    var viewportTop = window.scrollY;
    var viewportBottom = viewportTop + windowHeight;
    var formContainerHeight = this.formContainerElement.offsetHeight;
    var formContainerTop = this.formContainerElement.offsetTop;
    var formElementTop = this.formElement.offsetTop;

    // Sticks the form to the top of the viewport.
    // If the viewport top is above the form top.
    // Or the viewport is larger then the form.
    if (formPaddingHeight < windowHeight || viewportTop < formElementTop - topPadding) {
      formTop = viewportTop - (formContainerTop - topPadding);
      if (formTop < 0) {
        formTop = 0;
      } else if (formTop + formPaddingHeight > formContainerHeight) {
        formTop = formContainerHeight - formPaddingHeight;
      }
      this.setState({ formTop });
      return;
    // Sticks the form to the bottom of the viewport.
    // If the viewport bottom is below the form bottom.
    } else if (viewportBottom > formElementTop + formViewHeight) {
      formTop = viewportBottom - (formContainerTop + formViewHeight);
      if (formTop + formPaddingHeight > formContainerHeight) {
        formTop = formContainerHeight - formPaddingHeight;
      }
      this.setState({ formTop });
      return;
    }
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
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Country Focus"
    });
    this.props.setCountry(e.target.value);
  },
  signupCheckboxChange: function(e) {
    this.props.setSignupCheckbox(e.target.checked);
  },
  privacyCheckboxChange: function(e) {
    this.props.setPrivacyCheckbox(e.target.checked);
  },
  onSubmit: function() {
    var valid = true;

    if (this.state.submitting !== NOT_SUBMITTING) {
      return;
    }

    if (!this.props.email.trim()) {
      valid = false;
      this.props.setEmailError(this.context.intl.formatMessage({id: "please_complete"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Empty Email Error"
      });
    } else if (!this.emailInput.validity.valid) {
      valid = false;
      this.props.setEmailError(this.context.intl.formatMessage({id: "email_invalid"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Invalid Email Error"
      });
    }

    if (!this.props.privacyCheckbox) {
      valid = false;
      this.props.setPrivacyCheckboxError(this.context.intl.formatMessage({id: "please_complete"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Privacy Policy Error"
      });
    }

    if (!this.props.signupCheckbox) {
      valid = false;
      this.props.setSignupCheckboxError(this.context.intl.formatMessage({id: "please_complete"}));
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Opt-in Error"
      });
    }

    if (valid) {
      reactGA.event({
        category: "Signup",
        action: "Submitting the form",
        label: "Copyright"
      });
      this.basket({
        email: this.props.email,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        country: this.props.country
      });
    }
  },
  mobileGetInvolved: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Get Involved Clicked"
    });
  },
  getPosition: function() {
    if (!this.stickyContainer) {
      return 0;
    }
    return this.stickyContainer.getClientRects()[0].top + this.stickyContent.offsetHeight + window.scrollY - window.innerHeight;
  },
  onFirstNameInputClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "First Name Focus"
    });
  },
  onLastNameInputClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Last Name Focus"
    });
  },
  onEmailInputClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Email Focus"
    });
  },
  onPrivacyCheckboxClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Privacy Checkbox Focus"
    });
  },
  onSignupCheckboxClick: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Opt-in Checkbox Focus"
    });
  },
  render: function() {
    var emailClassName = classnames({
      "invalid": !!this.props.emailError
    });

    var buttonClassName = classnames(`button`, {
      "submitting": this.state.submitting === SIGNUP_SUBMITTING,
      "arrow": this.state.submitting === NOT_SUBMITTING
    });
    var buttonText = this.context.intl.formatMessage({id: 'sign_up_button'});
    if (this.state.submitting) {
      buttonText = ``;
    }

    var localizedCountries = this.context.localizedCountries;

    return (
      <div  ref={(element) => { this.formContainerElement = element; }} className="signup-form-container">
        <div id="get-involved" className="nav-anchor nav-offset"></div>
        <div ref={(element) => { this.formElement = element; }} className="signup-form" style={{marginTop: this.state.formTop + "px"}}>
          <h3>
            {this.context.intl.formatMessage({id: 'take_action_headline2'})}
          </h3>
          <p>
            {this.context.intl.formatMessage({id: 'take_action_description'})}
          </p>
          <div ref={(element) => { this.stickyContainer = element; }}>
            <StickyContainer className="sticky-container" stickyTo={this.getPosition}>
              <div className="sticky-content" ref={(element) => { this.stickyContent = element; }}>
                <a onClick={this.mobileGetInvolved} className="get-involved button arrow" href="#get-involved">
                  {this.context.intl.formatMessage({id: 'get_involved_button'})}
                </a>
              </div>
            </StickyContainer>
          </div>
          <input onClick={this.onFirstNameInputClick} autoComplete="off" type='text' value={this.props.firstName} onChange={this.firstNameChange} placeholder={this.context.intl.formatMessage({id: 'first_name'})}/>
          <input onClick={this.onLastNameInputClick} autoComplete="off" type='text' value={this.props.lastName} onChange={this.lastNameChange} placeholder={this.context.intl.formatMessage({id: 'last_name'})}/>
          <input onClick={this.onEmailInputClick} autoComplete="off" ref={(input) => { this.emailInput = input; }} type='email' className={emailClassName} value={this.props.email} onChange={this.emailChange} required placeholder={this.context.intl.formatMessage({id: 'email'})}/>
          <select autoComplete="off" required value={this.props.country} onChange={this.countryChange}>
            <option value="">{this.context.intl.formatMessage({id: 'country'})}</option>
            {
              Object.keys(localizedCountries).sort().map(function(name, index) {
                return <option key={localizedCountries[name]} value={localizedCountries[name]}>{name}</option>;
              })
            }
            <option value="other" data-other="">{this.context.intl.formatMessage({id: 'country_other'})}</option>
          </select>
          <p className="error-message">{this.props.emailError}</p>
          <p className="error-message">{this.state.signupError}</p>
          <label>
            <input onClick={this.onSignupCheckboxClick} className="checkbox" autoComplete="off" onChange={this.signupCheckboxChange} value={this.props.signupCheckbox} type="checkbox"></input>
            {this.context.intl.formatMessage({id: 'signup_checkbox'})}
          </label>
          <p className="privacy-error error-message">{this.props.signupCheckboxError}</p>
          <label>
            <input onClick={this.onPrivacyCheckboxClick} className="checkbox" autoComplete="off" onChange={this.privacyCheckboxChange} value={this.props.privacyCheckbox} type="checkbox"></input>
            <FormattedMessage
              id='sign_up_notice'
              values={{
                linkPrivacyNotice: (<a href="https://www.mozilla.org/privacy/websites/">{this.context.intl.formatMessage({id: 'link_pn'})}</a>)
              }}
            />
          </label>
          <p className="privacy-error error-message">{this.props.privacyCheckboxError}</p>
          <button onClick={this.onSubmit} className={buttonClassName}>
            {buttonText}
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
    country: state.signupForm.country,
    signupCheckbox: state.signupForm.signupCheckbox,
    signupCheckboxError: state.signupForm.signupCheckboxError,
    privacyCheckbox: state.signupForm.privacyCheckbox,
    privacyCheckboxError: state.signupForm.privacyCheckboxError
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
    },
    setSignupCheckbox: function(data) {
      dispatch(setSignupCheckbox(data));
    },
    setSignupCheckboxError: function(data) {
      dispatch(setSignupCheckboxError(data));
    },
    setPrivacyCheckbox: function(data) {
      dispatch(setPrivacyCheckbox(data));
    },
    setPrivacyCheckboxError: function(data) {
      dispatch(setPrivacyCheckboxError(data));
    }
  };
})(Signup);
