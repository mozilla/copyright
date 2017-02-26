import React  from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import { SimpleNav } from '../components/nav.js';
import SignupForm from '../components/signup-form.js';
import FormBody from '../components/form-body.js';

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
                text: this.context.intl.formatMessage({id: `nav_copyright_campaign`}),
                item: `about`,
                link: `/signup#about`
              },
              {
                text: this.context.intl.formatMessage({id: `nav_more_resources`}),
                item: `resources`,
                link: `/resources`
              },
              {
                text: this.context.intl.formatMessage({id: `nav_get_involved`}),
                item: `get-involved`,
                link: `/signup#get-involved`
              }
            ]}
          />
          <Header signupDomain="/signup"/>
          <div className="signup-container">
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
