import React  from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import { SimpleNav } from '../components/nav.js';

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var className = "share";
    if (this.props.test) {
      className += " " + this.props.test;
    }

    var appURL = process.env.APPLICATION_URI;
    var locale = this.context.intl.locale;
    var twitterShareURL = 'https://twitter.com/share?url=' + appURL +'/' + locale + '/&text=' + encodeURIComponent(this.context.intl.formatMessage({id: 'twitter_share_a'}, {twitterLink: ``}));
    var facebookShareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + appURL + '/' + locale + '/';
    var emailSubject = this.context.intl.formatMessage({id: 'share_email_subject'});
    var emailBody1 = this.context.intl.formatMessage({id: 'share_email_body_1'});
    var emailBody2 = this.context.intl.formatMessage({id: 'share_email_body_2'}, {emailLink: appURL +'/'});
    var emailBody3 = this.context.intl.formatMessage({id: 'share_email_body_3'});
    var emailShareURL = 'mailto:someone@example.com?subject='+ emailSubject +'&body='+ emailBody1 + `%0D%0A%0D%0A` + emailBody2 + `%0D%0A%0D%0A` + emailBody3 +'';

    return (
      <div className={className}>
        <div className="page">
          <SimpleNav/>
          <div className="share-page-container">
            <div className="share-page-content-container">
              <div className="share-page-content">
                <h2>
                  {this.context.intl.formatMessage({id: 'title'})}
                </h2>
                <p>
                  {this.context.intl.formatMessage({id: 'headline'})}
                </p>
                <div className="share-buttons">
                  <a className="share-button email-button" href={emailShareURL} target="_blank">
                    <i className="fa fa-envelope fa-1x"></i>
                  </a>
                  <a className="share-button facebook-button" href={facebookShareURL} target="_blank">
                    <i className="fa fa-facebook fa-1x"></i>
                  </a>
                  <a className="share-button twitter-button" href={twitterShareURL} target="_blank">
                    <i className="fa fa-twitter fa-1x"></i>
                  </a>
                </div>
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
