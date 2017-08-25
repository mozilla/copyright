import React from 'react';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="call-button-container">
        <button className="call-button">{this.context.intl.formatMessage({id: 'call_now_button'})}</button>
      </div>
    );
  }
});
