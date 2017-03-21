import React from 'react';
import reactGA from 'react-ga';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  mobileGetInvolved: function() {
    reactGA.event({
      category: "Signup",
      action: "Form Step",
      label: "Get Involved Clicked"
    });
  },
  render: function() {
    return (
      <div className="header">
        <div className="header-image"></div>
        <div className="header-content">
          <div className="header-content-container">
            <h1>
              {this.context.intl.formatMessage({id: 'main_title'})}
            </h1>
            <p>
              {this.context.intl.formatMessage({id: 'tagline'})}
            </p>
            <a onClick={this.mobileGetInvolved} className="get-involved button arrow" href="#get-involved">
              {this.context.intl.formatMessage({id: 'get_involved_button'})}
            </a>
          </div>
        </div>
      </div>
    );
  }
});
