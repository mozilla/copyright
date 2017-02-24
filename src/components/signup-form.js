import React from 'react';
import { FormattedMessage } from 'react-intl';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="signup-form-container">
        <div className="signup-form">
          <h3>
            {this.context.intl.formatMessage({id: 'take_action_headline'})}
          </h3>
          <p>
            {this.context.intl.formatMessage({id: 'take_action_description'})}
          </p>
          <label>
            {this.context.intl.formatMessage({id: 'first_name'})}
          </label>
          <input/>
          <label>
            {this.context.intl.formatMessage({id: 'last_name'})}
          </label>
          <input/>
          <label>
            {this.context.intl.formatMessage({id: 'email'})}
          </label>
          <input/>
          <label>
            {this.context.intl.formatMessage({id: 'country'})}
          </label>
          <input/>
          <div className="privacy-policy">
            <FormattedMessage
              id='sign_up_notice'
              values={{
                linkTerms: (<a href="#">{this.context.intl.formatMessage({id: 'link_tos'})}</a>),
                linkPrivacyPolicy: (<a href="#">{this.context.intl.formatMessage({id: 'link_pp'})}</a>)
              }}
            />
          </div>
          <button>
            {this.context.intl.formatMessage({id: 'sign_up_button'})}
          </button>
        </div>
      </div>
    );
  }
});
