import React from 'react';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="nav-container">
        <div className="nav">
          <div className="nav-logo-container">
            <a href="#" className="nav-logo"></a>
          </div>
          <a href="#" className="nav-link">
            {this.context.intl.formatMessage({id: 'nav_copyright_campaign'})}
          </a>
          <a href="#" className="nav-link">
            {this.context.intl.formatMessage({id: 'nav_more_resources'})}
          </a>
          <a href="#" className="nav-link">
            {this.context.intl.formatMessage({id: 'nav_get_involved'})}
          </a>
        </div>
      </div>
    );
  }
});
