import React  from 'react';
import Footer from '../components/footer.js';
import CallTool from '../components/call-tool.js';
import { SimpleNav } from '../components/nav.js';

import { FormattedHTMLMessage } from 'react-intl';

var Resources = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object,
  },
  render: function() {
    var className = "call-now";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <SimpleNav active="call-now" useLangPicker={true}/>
          <section>
            <h1>{this.context.intl.formatMessage({id: 'call_tool_headline'})}</h1>

            <ol>
              <li>
                <p className="bold">{this.context.intl.formatMessage({id: 'script_step_1'})}</p>
              </li>
              <li>
                <p className="bold">{this.context.intl.formatMessage({id: 'script_step_2'})}</p>
              </li>
              <li>
                <p className="bold">{this.context.intl.formatMessage({id: 'script_step_3'})}</p>
              </li>
              <li>
                <p className="bold">{this.context.intl.formatMessage({id: 'script_step_4'})}</p>

                <p><FormattedHTMLMessage id='script_desc_1'/></p>
                <p><FormattedHTMLMessage id='script_desc_2'/></p>
                <p><FormattedHTMLMessage id='script_desc_3'/></p>
                <p><FormattedHTMLMessage id='script_desc_4'/></p>
              </li>
            </ol>
          </section>
          <CallTool/>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Resources;
