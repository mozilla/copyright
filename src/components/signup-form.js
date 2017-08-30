import React from 'react';
import { FormattedMessage } from 'react-intl';
import { setEmailError, setEmail, setSignupCheckbox, setSignupCheckboxError, setPrivacyCheckbox, setPrivacyCheckboxError } from '../actions';
import { connect } from 'react-redux';
import classnames from "classnames";
import reactGA from 'react-ga';

var NOT_SUBMITTING = 0;
var SIGNUP_SUBMITTING = 1;

var Signup = React.createClass({
  mixins: [require('../mixins/basket.js')],
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      signupError: "",
      submitting: NOT_SUBMITTING
    };
  },
  emailChange: function(e) {
    this.props.setEmail(e.target.value);
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
        email: this.props.email
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
    var emailClassName = classnames("email-input", {
      "invalid": !!this.props.emailError
    });

    var desktopButtonClassName = classnames(`desktop-button button signup-button`, {
      "submitting": this.state.submitting === SIGNUP_SUBMITTING,
      "arrow": this.state.submitting === NOT_SUBMITTING
    });

    var mobileButtonClassName = classnames(`mobile-button button signup-button`, {
      "submitting": this.state.submitting === SIGNUP_SUBMITTING,
      "arrow": this.state.submitting === NOT_SUBMITTING
    });
    var buttonText = this.context.intl.formatMessage({id: 'subscrib_button'});
    if (this.state.submitting) {
      buttonText = ``;
    }

    return (
      <div className="signup-form-background">
        <section>
          <div className="signup-form-container">
            <div>
              <h3>
                {this.context.intl.formatMessage({id: 'join_newsletter'})}
              </h3>
              <p>
                {this.context.intl.formatMessage({id: 'join_newsletter_desc'})}
              </p>
            </div>

            <div>
              <div className="no-wrap">
                <input onClick={this.onEmailInputClick} autoComplete="off" ref={(input) => { this.emailInput = input; }} type='email' className={emailClassName} value={this.props.email} onChange={this.emailChange} required placeholder={this.context.intl.formatMessage({id: 'newsletter_placeholder'})}/>
                <button onClick={this.onSubmit} className={desktopButtonClassName}>
                  {buttonText}
                </button>
              </div>
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
                  id='newsletter_notice'
                  values={{
                    linkPrivacyNoticeNewsletter: (<a href="https://www.mozilla.org/privacy/websites/">{this.context.intl.formatMessage({id: 'newsletter_link_pn'})}</a>)
                  }}
                />
              </label>
              <p className="privacy-error error-message">{this.props.privacyCheckboxError}</p>
              <button onClick={this.onSubmit} className={mobileButtonClassName}>
                {buttonText}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
});

module.exports = connect(
function(state) {
  return {
    email: state.signupForm.email,
    emailError: state.signupForm.emailError,
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
