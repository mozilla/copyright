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
        <p><span className="blue-highlight">{this.context.intl.formatMessage({id: 'epic_battle_tagline_mep'})}</span></p>
        <p className="header-paragraph"><FormattedHTMLMessage id="next_steps_announcement"/></p>
        <p className="header-paragraph">{this.context.intl.formatMessage({id: 'main_title_desc'})}</p>
        <CallButton shadow={true} />
        <p className="italic"><a href={`/${this.context.intl.locale}/call-now`}>{this.context.intl.formatMessage({id: 'cta_tagline_calling'})}</a></p>
      </header>
    );
  }
});
