import React  from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import { SimpleNav } from '../components/nav.js';
import SignupForm from '../components/signup-form.js';
import FormBody from '../components/form-body.js';

var Resource = React.createClass({
  render: function() {
    return (
      <div className="resource-container"></div>
    );
  }
});

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var className = "signup";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <SimpleNav active="resources"
            links={[
              {
                text: this.context.intl.formatMessage({id: `nav_copyright_campaign2`}),
                item: `about`,
                link: `/signup#about`
              },
              {
                text: `More Resources`,
                item: `resources`,
                link: `/resources`
              },
              {
                text: this.context.intl.formatMessage({id: `nav_get_involved2`}),
                item: `get-involved`,
                link: `/signup#get-involved`
              }
            ]}
          />
          <div className="resources-page-container">
            <div className="resources-page">
              <h2>Resources</h2>
              <p>Learn more about copyright Reform</p>
              <h4>Read</h4>
              <div className="horizontal-rule"></div>
              <div className="resources-container">
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
              </div>
              <h4>Watch</h4>
              <div className="horizontal-rule"></div>
              <div className="resources-container">
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
              </div>
              <h4>Chat + Follow</h4>
              <div className="horizontal-rule"></div>
              <div className="resources-container chat-follow-container">
                <Resource/>
                <Resource/>
                <Resource/>
                <Resource/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
