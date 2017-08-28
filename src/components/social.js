import React from 'react';
import Social from './social.js';
import reactGA from 'react-ga';

var ShareProgressButton = React.createClass({
  componentDidMount: function() {
    var shareProgressHolder = document.querySelector(".share-progress-holder");
    var shareProgressButton = shareProgressHolder.querySelector("." + this.props.shareProgress);
    if (shareProgressButton) {
      shareProgressHolder.removeChild(shareProgressButton);
      this.shareProgressContainer.appendChild(shareProgressButton);
    }
  },
  componentWillUnmount: function() {
    var shareProgressButton = this.shareProgressContainer.querySelector("." + this.props.shareProgress);
    var shareProgressHolder = document.querySelector(".share-progress-holder");
    if (shareProgressButton) {
      this.shareProgressContainer.removeChild(shareProgressButton);
      shareProgressHolder.appendChild(shareProgressButton);
    }
  },
  render: function() {
    return (
      <div onClick={this.props.onClick} className="share-progress-wrapper">
        <div ref={(container) => { this.shareProgressContainer = container; }}></div>
        {this.props.children}
      </div>
    );
  }
});

var SocialButton = React.createClass({
  render: function() {
    return (
      <a onClick={this.props.onClick} href={this.props.href} target="_blank">
        {this.props.children}
      </a>
    );
  }
});

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  socialClick: function(label) {
    reactGA.event({
      category: "Social",
      action: "Clicked on button",
      label: label
    });
    return true;
  },
  facebookClick: function() {
    return this.socialClick("facebook");
  },
  twitterClick: function() {
    return this.socialClick("twitter");
  },
  emailClick: function() {
    return this.socialClick("email");
  },
  render: function() {
    var appURL = process.env.APPLICATION_URI;
    var locale = this.context.intl.locale;
    var twitterShareURL = 'https://twitter.com/share?url=' + appURL +'/' + locale + '/&text=' + encodeURIComponent(this.context.intl.formatMessage({id: 'sharing_twitter_a'}));
    var facebookShareURL = 'https://www.facebook.com/sharer/sharer.php?u=' + appURL + '/' + locale + '/';
    var emailSubject = this.context.intl.formatMessage({id: 'sharing_email_subject_a'});
    var emailBody = this.context.intl.formatMessage({id: 'sharing_email_body_a'});
    var emailShareURL = 'mailto:someone@example.com?subject='+ emailSubject +'&body='+ emailBody +'';

    if (/^(en)(\b|$)/.test(locale)) {
      return (
        <div className="social-container">
          <ShareProgressButton onClick={this.facebookClick} shareProgress="sp_fb_small">
            <i className="fa fa-facebook" aria-hidden="true"/>
          </ShareProgressButton>
          <ShareProgressButton onClick={this.twitterClick} shareProgress="sp_tw_small">
            <i className="fa fa-twitter" aria-hidden="true"/>
          </ShareProgressButton>
          <ShareProgressButton onClick={this.emailClick} shareProgress="sp_em_small">
            <i className="fa fa-envelope" aria-hidden="true"/>
          </ShareProgressButton>
        </div>
      );
    }

    return (
      <div className="social-container">
        <SocialButton onClick={this.facebookClick} href={facebookShareURL}>
          <i className="fa fa-facebook" aria-hidden="true"/>
        </SocialButton>
        <SocialButton onClick={this.twitterClick} href={twitterShareURL}>
          <i className="fa fa-twitter" aria-hidden="true"/>
        </SocialButton>
        <SocialButton onClick={this.emailClick} href={emailShareURL}>
          <i className="fa fa-envelope" aria-hidden="true"/>
        </SocialButton>
      </div>
    );
  }
});
