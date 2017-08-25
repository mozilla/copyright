import React from 'react';
import reactGA from 'react-ga';
import classnames from 'classnames';
import submit from '../lib/submit.js';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  callMEP: function() {
    submit(
      '/api/call',
      {
        number: this.props.number,
        country: this.context.intl.locale
      },
      (result) => this.callPlaced(result),
      (status, errorPromise) => this.callFailed(status, errorPromise)
    );
  },
  callPlaced: function(result) {
    console.log("Call placed:", result);
  },
  callFailed: function(status, errorPromise) {
    console.error("Call failed:", status);
    errorPromise.then(error => console.error(error));
  },
  /**
   * render pulls double duty, in that it determines whether it
   * needs render a real call button, or a navigation link that
   * sends visitors on to the "call-now" section of this website.
   */
  render: function() {
    if (typeof this.props.number !== "undefined") {
      return this.renderCallButton();
    }
    const shadow = this.props.shadow;
    const containerClass = classnames("call-button-container", {shadow: shadow});
    const buttonProps = {
      href: `/${this.context.intl.locale}/call-now`,
      className: classnames(
        "button",
        "call-button",
        { "shadow": shadow }
      )
    };
    return (
      <div className={containerClass}>
        <a {...buttonProps}>{this.context.intl.formatMessage({id: 'call_now_button'})}</a>
      </div>
    );
  },
  renderCallButton: function() {
    return (
      <button onClick={() => this.callMEP()}>{this.context.intl.formatMessage({id: 'call_now_button'})}</button>
    )
  }
});
