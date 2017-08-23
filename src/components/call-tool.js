import React from 'react';

var prefixMap = {
  "30": "🇬🇷",
  "31": "🇳🇱",
  "32": "🇧🇪 ",
  "33": "🇫🇷",
  "34": "🇪🇸",
  "36": "🇭🇺",
  "39": "🇮🇹",
  "40": "🇷🇴",
  "41": "🇨🇭",
  "43": "🇦🇹",
  "44": "🇬🇧",
  "45": "🇩🇰",
  "46": "🇸🇪",
  "47": "🇳🇴",
  "48": "🇵🇱",
  "49": "🇩🇪",
  "350": "🇬🇮",
  "351": "🇵🇹",
  "352": "🇱🇺",
  "353": "🇮🇪",
  "354": "🇮🇸",
  "355": "🇦🇱",
  "356": "🇲🇹",
  "357": "🇨🇾",
  "358": "🇫🇮",
  "359": "🇧🇬",
  "370": "🇱🇹",
  "371": "🇱🇻",
  "372": "🇪🇪",
  "373": "🇲🇩",
  "374": "🇦🇲",
  "375": "🇧🇾",
  "376": "🇦🇩",
  "377": "🇲🇨",
  "378": "🇸🇲",
  "379": "🇻🇦",
  "380": "🇺🇦",
  "381": "🇷🇸",
  "382": "🇲🇪",
  "383": "🇽🇰",
  "385": "🇭🇷",
  "386": "🇸🇮",
  "387": "🇧🇦",
  "389": "🇲🇰",
  "420": "🇨🇿",
  "421": "🇸🇰",
  "423": "🇱🇮"
};

var localeCodeMap = {
  "el": "30",
  "nl": "31",
  "fr": "33",
  "es": "34",
  "it": "39",
  "en-GB": "40",
  "en-US": "40",
  "de": "49",
  "pl": "48"
};

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
    return (
      <div className="call-tool-background">
        <section>
          <h2>{this.context.intl.formatMessage({id: 'enter_phone_title'})}</h2>
          <span className="select-container">
            <span className="country-prefix-display">
              {prefixMap[this.state.countryPrefix]}
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
            <select onChange={this.prefixChange} value={this.state.countryPrefix}>
            {
              Object.keys(prefixMap).map((value) => {
                var prefixObject = prefixMap[value];
                return (
                  <option key={value} value={value}>
                    {prefixObject + " (+" + value + ")"}
                  </option>
                )
              })
            }
            </select>
          </span>
          <span className="input-container">
            <input ref={(input) => { this.textInput = input; }} onChange={this.numberChange} value={this.state.number} placeholder={this.context.intl.formatMessage({id: 'call_tool_input_placeholder'})}/>
            <span className="placeholder-container">
              <span className="placeholder-width">{"(+" + this.state.countryPrefix + ")"}&nbsp;</span>
              <span className="placeholder">{placeholder}</span>
            </span>
          </span>
          <button>{this.context.intl.formatMessage({id: 'call_now_button'})}</button>
          <div>{this.context.intl.formatMessage({id: 'cta_disclaimer'})}</div>
        </section>
      </div>
    );
  }
});
