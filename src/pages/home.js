import React  from 'react';
import storage from '../lib/session-storage.js';

import Footer from '../components/footer.js';
import Header from '../components/header.js';
import { SimpleNav } from '../components/nav.js';
import CallButton from '../components/call-button.js';
import SignupForm from '../components/signup-form.js';
import Modal from '../components/modal.js';

var Impact = React.createClass({
  render: function() {
    return (
      <div className="impact-item-container">
        <img height="219" width="237" src={this.props.icon}/>
        <div>
          <h2>{this.props.header}</h2>
          <p>{this.props.children}</p>
        </div>
      </div>
    );
  }
});

const DONATE_CTA_DELAY = 750; // in milliseconds

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      showModal: false,
      dismissedModal: false
    };
  },
  getString: function(id) {
    return this.context.intl.formatMessage({ id });
  },
  componentDidMount: function() {
    if (typeof window !== "undefined" && window.addEventListener) {
      this._withScroll = e => this.handleScroll(e);
      window.addEventListener('scroll', this._withScroll);
    }
  },
  componentWillUnmount() {
    if (this._withScroll) {
      window.removeEventListener('scroll', this._withScroll);
    }
  },
  handleScroll: function(e) {
    if (this._ctaTimeout) {
      clearTimeout(this._ctaTimeout);
    }
    this._ctaTimeout = setTimeout(() => this.spawnDonateCTA(), DONATE_CTA_DELAY);
  },
  spawnDonateCTA: function() {
    if (!storage.getItem('dismissedModal')) {
      this.setState({
        showModal: true
      });
    }
  },
  closeModal: function() {
    this.setState({
      showModal: false
    }, () => storage.setItem('dismissedModal', 'true'));
  },
  generateModal: function() {
    if (this.state.showModal) {
      return this.generateDonationModal();
    }
    return null;
  },
  generateDonationModal: function() {
    return (
      <Modal onClose={() => this.closeModal()}>
        <section className="donate-container">
          <h2>{ this.getString('love_the_web') }<br/> { this.getString('join_the_defense') }</h2>
          <p className="playfair">{ this.getString('save_the_future') } { this.getString('mozilla_fights') }</p>
          <p className="playfair emphasized">{ this.getString('please_donate') }</p>
          <a href="https://donate.mozilla.org" className="donate-button">{ this.getString('donate_now') }</a>
        </section>
      </Modal>
    );
  },

  render: function() {
    var className = "home";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        { this.generateModal() }

        <div className="page">
          <div id="home" className="nav-anchor nav-offset"></div>
          <SimpleNav active="home" useLangPicker={true}/>
          <Header/>
          <section>
            <h1>
              {this.context.intl.formatMessage({id: 'explanation_title'})}
            </h1>
            <Impact
              header={this.context.intl.formatMessage({id: 'explanation_technologist'})}
              icon="/assets/images/01_Technologist.png"
            >
              {this.context.intl.formatMessage({id: 'explanation_technologist_desc'})}
              &nbsp;
              <a href={`/${this.context.intl.locale}/impact#technologist`}>
                {this.context.intl.formatMessage({id: 'explanation_learn_more'})}
              </a>
            </Impact>
            <Impact
              header={this.context.intl.formatMessage({id: 'explanation_creator_innovator'})}
              icon="/assets/images/02_Creator.png"
            >
              {this.context.intl.formatMessage({id: 'explanation_creator_innovator_desc'})}
              &nbsp;
              <a href={`/${this.context.intl.locale}/impact#creator-innovator`}>
                {this.context.intl.formatMessage({id: 'explanation_learn_more'})}
              </a>
            </Impact>
            <Impact
              header={this.context.intl.formatMessage({id: 'explanation_scientists_librarian'})}
              icon="/assets/images/03_Librarian.png"
            >
              {this.context.intl.formatMessage({id: 'explanation_scientists_librarian_desc'})}
              &nbsp;
              <a href={`/${this.context.intl.locale}/impact#scientist-librarian`}>
                {this.context.intl.formatMessage({id: 'explanation_learn_more'})}
              </a>
            </Impact>
          </section>
          <CallButton/>
          <SignupForm/>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Signup;
