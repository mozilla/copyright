import React from 'react';
import CallButton from '../components/call-button.js';
import { FormattedHTMLMessage } from 'react-intl';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <header className="header">
        <h1>{this.context.intl.formatMessage({id: 'main_title_digital_age'})}</h1>
        <p className="header-paragraph"><FormattedHTMLMessage id="next_steps_announcement"/></p>
      </header>
    );
  }
});
