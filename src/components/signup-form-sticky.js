import React from 'react';

var Signup = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      formTop: 0
    };
  },
  componentDidMount: function() {
    document.addEventListener(`scroll`, this.onScroll);
    setTimeout(this.onScroll);
  },
  componentWillUnmount: function() {
    document.removeEventListener(`scroll`, this.onScroll);
  },
  onScroll: function() {
    if (window.innerWidth <= 992 ) {
      return;
    }
    var formTop = 0;
    var viewportPadding = 30;
    var navHeight = 64;
    var formBottomPadding = 144;
    var topPadding = viewportPadding + navHeight;
    var formHeight = this.formElement.offsetHeight;
    var formPaddingHeight = formHeight + formBottomPadding;
    var formViewHeight = formHeight + viewportPadding;
    var windowHeight = window.innerHeight;
    var viewportTop = window.scrollY;
    var viewportBottom = viewportTop + windowHeight;
    var formContainerHeight = this.formContainerElement.offsetHeight;
    var formContainerTop = this.formContainerElement.offsetTop;
    var formElementTop = this.formElement.offsetTop;

    // Sticks the form to the top of the viewport.
    // If the viewport top is above the form top.
    // Or the viewport is larger then the form.
    if (formPaddingHeight < windowHeight || viewportTop < formElementTop - topPadding) {
      formTop = viewportTop - (formContainerTop - topPadding);
      if (formTop < 0) {
        formTop = 0;
      } else if (formTop + formPaddingHeight > formContainerHeight) {
        formTop = formContainerHeight - formPaddingHeight;
      }
      this.setState({ formTop });
      return;
    // Sticks the form to the bottom of the viewport.
    // If the viewport bottom is below the form bottom.
    } else if (viewportBottom > formElementTop + formViewHeight) {
      formTop = viewportBottom - (formContainerTop + formViewHeight);
      if (formTop + formPaddingHeight > formContainerHeight) {
        formTop = formContainerHeight - formPaddingHeight;
      }
      this.setState({ formTop });
      return;
    }
  },
  render: function() {
    return (
      <div  ref={(element) => { this.formContainerElement = element; }} className="signup-form-container">
        <div id="get-involved" className="nav-anchor nav-offset"></div>
        <div ref={(element) => { this.formElement = element; }} className="signup-form" style={{marginTop: this.state.formTop + "px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Signup;
