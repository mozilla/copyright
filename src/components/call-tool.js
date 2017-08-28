import React from 'react';
import classnames from 'classnames';
import CallButton from './call-button.js';
import { prefixMap, localeCodeMap } from '../lib/call-data';
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
    if (status >= 500) {
      // ReactGA event about a server failure?
    }

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
    var placeholder = this.context.intl.formatMessage({id: 'enter_phone'});
    if (!this.state.number || this.state.number !== "(+" + this.state.countryPrefix + ") ") {
      placeholder = "";
    }
    const localeOptions = Object.keys(prefixMap).map((value) => {
      var prefixObject = prefixMap[value];
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
              {prefixMap[this.state.countryPrefix]}
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
            <select onChange={this.prefixChange} value={this.state.countryPrefix}>{localeOptions}</select>
          </span>
          <span className="input-container">
            <input ref={(input) => { this.textInput = input; }} onChange={this.numberChange} value={this.state.number} placeholder={this.context.intl.formatMessage({id: 'enter_phone'})}/>
            <span className="placeholder-container">
              <span className="placeholder-width">{"(+" + this.state.countryPrefix + ")"}&nbsp;</span>
              <span className="placeholder">{placeholder}</span>
            </span>
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
        <div className="bold">SOCIAL ICONS GO HERE</div>
      </section>
    );
  }
});
