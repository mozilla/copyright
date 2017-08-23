import React  from 'react';
import Footer from '../components/footer.js';
import { SimpleNav } from '../components/nav.js';
import CallButton from '../components/call-button.js';
import SignupForm from '../components/signup-form.js';

var Impact = React.createClass({
  render: function() {
    return (
      <div className="impact-item-container">
        <img height="126" width="126" src="/assets/images/126x126.jpg"/>
        <div>
          <h2>{this.props.children}</h2>
        </div>
      </div>
    );
  }
});

var Resources = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var className = "impact";
    if (this.props.test) {
      className += " " + this.props.test;
    }
    return (
      <div className={className}>
        <div className="page">
          <SimpleNav active="impact" useLangPicker={true}/>
          <section>
            <h1>{this.context.intl.formatMessage({id: 'impact_main_title'})}</h1>
            <div className="impact-items-container">
              <Impact>
                {this.context.intl.formatMessage({id: 'impact_technologist'})}
              </Impact>
              <Impact>
                {this.context.intl.formatMessage({id: 'impact_creator_innovator'})}
              </Impact>
              <Impact>
                {this.context.intl.formatMessage({id: 'impact_scientist_librarian'})}
              </Impact>
            </div>
          </section>
          <section>
            <h1>
              {this.context.intl.formatMessage({id: 'technologist_section'})}
            </h1>
            <h3>
              {this.context.intl.formatMessage({id: 'technologist_article_11_title'})}
            </h3>
            <p className="question">
              {this.context.intl.formatMessage({id: 'article_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'technologist_article_11_desc1'})}
              {this.context.intl.formatMessage({id: 'technologist_article_11_desc2'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'technologist_article_11_desc3'})}
            </p>
            <p className="question">
              {this.context.intl.formatMessage({id: 'our_fight_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'technologist_article_11_fight1'})}
              {this.context.intl.formatMessage({id: 'technologist_article_11_fight2'})}
              {this.context.intl.formatMessage({id: 'technologist_article_11_fight3'})}
            </p>
            <p>
              <a href="#">
                {this.context.intl.formatMessage({id: 'technologist_learn_more'})}
              </a>
            </p>

            <h3>
              {this.context.intl.formatMessage({id: 'technologist_article_13_title'})}
            </h3>
            <p className="question">
              {this.context.intl.formatMessage({id: 'article_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'technologist_article_13_desc1'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'technologist_article_13_desc2'})}
              {this.context.intl.formatMessage({id: 'technologist_article_13_desc3'})}
            </p>
            <p className="question">
              {this.context.intl.formatMessage({id: 'our_fight_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'technologist_article_13_fight1'})}
              {this.context.intl.formatMessage({id: 'technologist_article_13_fight2'})}
              {this.context.intl.formatMessage({id: 'technologist_article_13_fight3'})}
            </p>
            <p>
              <a href="#">
                {this.context.intl.formatMessage({id: 'technologist_learn_more'})}
              </a>
            </p>
          </section>
          <section>
            <div className="horizontal-rule"></div>
            <h1>
              {this.context.intl.formatMessage({id: 'creator_innovator_section'})}
            </h1>
            <h3>
              {this.context.intl.formatMessage({id: 'creator_innovator_ugc_title'})}
            </h3>
            <p className="question">
              {this.context.intl.formatMessage({id: 'article_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'creator_innovator_ugc_desc1'})}
              {this.context.intl.formatMessage({id: 'creator_innovator_ugc_desc2'})}
            </p>
            <p className="question">
              {this.context.intl.formatMessage({id: 'our_fight_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'creator_innovator_ugc_fight'})}
            </p>
            <p>
              <a href="#">
                {this.context.intl.formatMessage({id: 'creator_innovator_learn_more'})}
              </a>
            </p>
          </section>
          <section>
            <div className="horizontal-rule"></div>
            <h1>
              {this.context.intl.formatMessage({id: 'scientist_librarian_section'})}
            </h1>
            <h3>
              {this.context.intl.formatMessage({id: 'scientist_librarian_article_3_title'})}
            </h3>
            <p className="question">
              {this.context.intl.formatMessage({id: 'article_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'scientist_librarian_article_3_desc1'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'scientist_librarian_article_3_desc2'})}
            </p>
            <p className="question">
              {this.context.intl.formatMessage({id: 'our_fight_explanation_subtitle'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'scientist_librarian_article_3_fight1'})}
              {this.context.intl.formatMessage({id: 'scientist_librarian_article_3_fight2'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'scientist_librarian_article_3_fight3'})}
            </p>
            <p>
              <a href="#">
                {this.context.intl.formatMessage({id: 'scientist_librarian_learn_more'})}
              </a>
            </p>

          </section>
          <CallButton/>
          <SignupForm/>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = Resources;
