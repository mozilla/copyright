import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

var Footer = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <footer>
        <div className="footer-contents">
          <div className="footer-links">
            <a href="https://www.mozilla.org/contact/" className="footer-link contact">
              {this.context.intl.formatMessage({id: 'contact_us'})}
            </a>
            <a href="#" className="footer-link share">
              {this.context.intl.formatMessage({id: 'share_this_page'})}
            </a>
            <a href="https://twitter.com/Mozilla" className="footer-link conversation">
              {this.context.intl.formatMessage({id: 'join_the_conversation'})}
            </a>
            <a href="https://www.mozilla.org/about/legal/terms/mozilla/" className="footer-link legal">
              {this.context.intl.formatMessage({id: 'legal'})}
            </a>
            <a href="https://www.mozilla.org/privacy/websites/" className="footer-link privacy">
              {this.context.intl.formatMessage({id: 'privacy_policy'})}
            </a>
            <a href="https://donate.mozilla.org/" className="footer-link donate">
              {this.context.intl.formatMessage({id: 'donate'})}
            </a>
          </div>
          <div className="org-info">
            <div className="logo-container">
              <a className="logo" href="https://mozilla.org"></a>
            </div>
            <span className="org-info-container">
              <FormattedHTMLMessage
                id='footer_description'
              />
            </span>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
