import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div className="form-body">
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
          <FormattedHTMLMessage
            id='sign_up_notice'
          />
        </div>
        <button>
          {this.context.intl.formatMessage({id: 'sign_up_button'})}
        </button>
      </div>
    );
  }
});
