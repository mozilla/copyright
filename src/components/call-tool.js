import React from 'react';
import classnames from 'classnames';
import CallButton from './call-button.js';
import Social from './social.js';
import { prefixMap, localeCodeMap, iconMap } from '../lib/call-data';
import { FormattedMessage } from 'react-intl';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    var countryPrefix = localeCodeMap[this.context.intl.locale] || "30";
    var number = "(+" + countryPrefix + ") ";
    return {
      countryPrefix,
      number,
      validNumber: true,
      calling: false,
      networkError: false
    };
  },
  componentDidMount: function() {
    // If the browser has a saved value via a soft refresh,
    // we can might as well use it.
    var countryPrefix = this.selectInput.value;
    var number = this.textInput.value;
    this.setState({
      countryPrefix,
      number
    });
  },
  prefixChange: function(e) {
    this.textInput.focus();
    this.setState({
      countryPrefix: e.target.value,
      number: "(+" + e.target.value + ") "
    });
  },
  numberChange: function(e) {
    this.setState({
      number: e.target.value,
      validNumber: true
    });
  },
  handleSuccess: function(s) {
    this.setState({
      calling: true
    })
  },
  handleError: function(status, e) {
    this.setState({
      validNumber: status !== 409,
      networkError: status === -1 || status >= 500
    });
  },
  retry: function() {
    this.setState({
      validNumber: true,
      networkError: false
    });
  },
  render: function() {
    var content = null;
    if (this.state.networkError) {
      content = this.renderNetworkError();
    } else if (this.state.calling) {
      content = this.renderCalling();
    } else {
      content = this.renderForm();
    }

    return (
      <div className="call-tool-background">{content}</div>
    );
  },
  renderNetworkError: function() {
    return (
      <section>
        <h2 className="bold">{this.context.intl.formatMessage({id: 'unknown_problems'})}</h2>
        <h2 className="bold">{this.context.intl.formatMessage({id: 'please_retry_later'})}</h2>
        <button onClick={() => this.retry()}>{this.context.intl.formatMessage({id: 'try_again'})}</button>
      </section>
    );
  },
  renderForm: function() {
    // We need to ensure there is enough space in the
    // input to show the placeholder in ultiple languages.
    var placeholder = this.context.intl.formatMessage({id: 'enter_phone'});
    var countryPrefix = "(+" + this.state.countryPrefix + ")";

    // Default placeholder state is a fresh page load state.
    // Example: "(+44) placeholder text"
    var placeholderContainer = (
      <span className="placeholder-container">
        <span className="placeholder-width">{countryPrefix}&nbsp;</span>
        <span className="placeholder">{placeholder}&nbsp;</span>
      </span>
    );

    // This state is for when the input has been cleared,
    // completely empty, so no county prefix.
    if (!this.state.number) {
      placeholderContainer = (
        <span className="placeholder-container">
          <span className="placeholder-width">{placeholder}&nbsp;</span>
        </span>
      );
    }
    // This state is for when the input is not empty and not default.
    // Example: "(+44) 12345678"
    else if (this.state.number !== "(+" + this.state.countryPrefix + ") ") {
      placeholderContainer = (
        <span className="placeholder-container">
          <span className="placeholder-width">{this.state.number}&nbsp;</span>
        </span>
      );
    }
    const localeOptions = Object.keys(prefixMap).map((value) => {
      var prefixObject = iconMap[prefixMap[value]];
      return (
        <option key={value} value={value}>
          {prefixObject + " (+" + value + ")"}
        </option>
      )
    });

    const messageId = this.state.validNumber ? 'enter_phone_title' : 'whoops_phone_number';

    return (
      <section>
        <h2 className="bold">{this.context.intl.formatMessage({id: messageId})}</h2>
        <div className={classnames("phone-number-input-container", { "valid": this.state.validNumber })}>
          <span className="select-container">
            <span className="country-prefix-display">
              <span className="flag-background" style={{backgroundImage: 'url(/assets/images/flags/' + prefixMap[this.state.countryPrefix] + '.svg)'}}></span>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
            <select ref={(input) => { this.selectInput = input; }} onChange={this.prefixChange} value={this.state.countryPrefix}>{localeOptions}</select>
          </span>
          <span className="input-container">
            <input ref={(input) => { this.textInput = input; }} onChange={this.numberChange} value={this.state.number} placeholder={this.context.intl.formatMessage({id: 'enter_phone'})}/>
            {placeholderContainer}
          </span>
        </div>

        <CallButton
          number={this.state.number}
          onSuccess={s => this.handleSuccess(s)}
          onError={e => this.handleError(e)}
        />

        <div>
          <FormattedMessage
            id='cta_disclaimer'
            values={{
              ctaTosLink: (<a href="https://www.mozilla.org/about/legal/terms/mozilla/">{this.context.intl.formatMessage({id: 'cta_link_tos'})}</a>),
              ctaPpLink: (<a href="https://www.mozilla.org/privacy/websites/">{this.context.intl.formatMessage({id: 'cta_link_pp'})}</a>)
            }}
          />
        </div>
      </section>
    );
  },
  renderCalling: function() {
    return (
      <section>
        <h2 className="bold">{this.context.intl.formatMessage({id: 'calling_headline'})}</h2>
        <div>{this.context.intl.formatMessage({id: 'calling_tagline'})}</div>
        <Social/>
        <p className="try-again">
          <FormattedMessage
            id='call_again'
            values={{
              callAgain: (<a href={`/${this.context.intl.locale}/call-now`}>{this.context.intl.formatMessage({id: 'call_again_link'})}</a>)
            }}
          />
        </p>
      </section>
    );
  }
});
