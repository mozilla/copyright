import React from 'react';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <header className="header">
        <h1>{this.context.intl.formatMessage({id: 'main_title_digital_age'})}</h1>
        <p><span className="blue-highlight">{this.context.intl.formatMessage({id: 'epic_battle_tagline_mep'})}</span></p>
        <p>{this.context.intl.formatMessage({id: 'main_title_desc_september'})}</p>
        <button className="shadow">{this.context.intl.formatMessage({id: 'call_now_button'})}</button>
        <p className="italic"><a href="#">{this.context.intl.formatMessage({id: 'cta_tagline_calling'})}</a></p>
      </header>
    );
  }
});
