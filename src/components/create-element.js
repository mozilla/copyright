import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';

var createElement = React.createClass({
  propTypes: {
    locale: React.PropTypes.string.isRequired,
    messages: React.PropTypes.object.isRequired,
    localizedCountries: React.PropTypes.object.isRequired
  },
  getChildContext: function() {
    return { localizedCountries:  this.props.localizedCountries};
  },
  childContextTypes: {
    localizedCountries: React.PropTypes.object
  },
  render: function() {
    return (
      <Provider store={createStore(reducer, {
        signupForm: {
          email: this.props.email,
          emailError: ``,
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          country: this.props.country
        }
      })}>
        <IntlProvider locale={this.props.locale} messages={this.props.messages}>
          {this.props.children}
        </IntlProvider>
      </Provider>
    );
  }
});

module.exports = createElement;
