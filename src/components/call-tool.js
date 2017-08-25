import React from 'react';
import CallButton from './call-button.js';
import { prefixMap, localeCodeMap } from '../lib/call-data';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    var countryPrefix = localeCodeMap[this.context.intl.locale] || "30";
    var number = "(+" + countryPrefix + ") ";
    return {
      countryPrefix,
      number
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
      number: e.target.value
    });
  },
  render: function() {
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
    return (
      <div className="call-tool-background">
        <section>
          <h2>{this.context.intl.formatMessage({id: 'enter_phone_title'})}</h2>
          <div className="phone-number-input-container">
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
          <CallButton number={this.state.number} />
          <div>{this.context.intl.formatMessage({id: 'cta_disclaimer'})}</div>
        </section>
      </div>
    );
  }
});
