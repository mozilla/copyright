import React from 'react';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
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
            <a className="button" href={this.props.signupDomain + "#get-involved"}>
              {this.context.intl.formatMessage({id: 'get_involved_button'})}
            </a>
          </div>
        </div>
      </div>
    );
  }
});
