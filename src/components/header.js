import React from 'react';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="header">
        <div className="header-content">
          <h1>
            {this.context.intl.formatMessage({id: 'main_title'})}
          </h1>
          <p>
            {this.context.intl.formatMessage({id: 'tagline'})}
          </p>
          <a href="#">
            {this.context.intl.formatMessage({id: 'get_involved_button'})}
          </a>
        </div>
        <div className="header-image"></div>
      </div>
    );
  }
});
