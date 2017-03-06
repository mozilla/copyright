import React from 'react';
import classnames from "classnames";
import enabledLocales from '../data/locales.js';

var MenuLink = React.createClass({
  onClick: function() {
    this.props.activate(this.props.item);
  },
  render: function() {
    var className = classnames(`nav-link`, {
      "active": this.props.active === this.props.item
    });

    return (
      <a className={className} onClick={this.onClick} href={this.props.href}>{this.props.children}</a>
    );
  }
});

var ScrollNav = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    var active = ``;

    return {active};
  },
  componentDidMount: function() {
    document.addEventListener(`scroll`, this.onScroll);
  },
  componentWillUnmount: function() {
    document.removeEventListener(`scroll`, this.onScroll);
  },
  onScroll: function() {
    var links = [].slice.call(document.querySelectorAll(`.nav-anchor`));
    var hash = window.location.hash.replace(`#`, ``);
    var active = ``;
    var scrollY = window.scrollY;

    if (links[0]) {
      active = links[0].getAttribute(`id`);
    }

    // If we have no hash, we should set it to the top nav.
    // We can stop checking.
    if (hash) {

      // Check to see which is the current nav item.
      links.forEach((element) => {
        if (scrollY >= element.offsetTop - ( window.innerHeight / 2 )) {
          active = element.getAttribute(`id`);
        }
      });

      // If we're at the bottom of the page, ensure the last item is active.
      // This is in case the last item's height is less than the window height.
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        active = links[links.length-1].getAttribute(`id`);
      }
    }

    this.activate(active);
  },
  activate: function(active) {
    var hash = window.location.hash.replace(`#`, ``);

    if (this.state.active !== active) {
      if (!hash || document.querySelector(`.nav-anchor#` + hash)) {
        window.history.replaceState({}, null, `#` + active);
      }
      this.setState({
        active: active || ``
      });
    }
  },
  render: function() {
    var links = [
      {
        text: this.context.intl.formatMessage({id: `nav_copyright_campaign2`}),
        item: `about`,
        link: `#about`
      },
      {
        text: this.context.intl.formatMessage({id: `nav_get_involved2`}),
        item: `get-involved`,
        link: `#get-involved`
      }
    ];
    if (/^(en)(\b|$)/.test(this.context.intl.locale)) {
      links.splice(1, 0, {
        text: `More Resources`,
        item: `resources`,
        link: `/resources`
      });
    }
    return (
      <SimpleNav activate={this.activate} active={this.state.active}
        links={links}
      />
    );
  }
});


var dropDownOnChange = function(change) {
  alert('onChangeForSelect:\noldValue: ' +
          change.oldValue +
          '\nnewValue: '
          + change.newValue);
  window.location.href=
  location.reload(true);
};


var SimpleNav = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var active = this.props.active || ``;
    var activate = this.props.activate || function() {};
    return (
      <div className="nav-container">
        <div className="nav">
          <div className="nav-logo-container">
            <a href="https://mozilla.org/" className="nav-logo"></a>
          </div>
          {
            this.props.links.map((linkObj, index) => {
              return (
                <MenuLink key={index}
                  activate={activate}
                  active={active}
                  item={linkObj.item}
                  href={linkObj.link}
                >
                  {linkObj.text}
                </MenuLink>
              );
            })
          }
          <div className="nav-lang-selector">
            <Dropdown id='myDropdown'
              options={enabledLocales}
              value={this.context.intl.locale}
              labelField='description'
              valueField='code'
              onChange={dropDownOnChange}/>
          </div>
        </div>
      </div>
    );
  }
});

var Dropdown = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    value: React.PropTypes.oneOfType(
      [
        React.PropTypes.number,
        React.PropTypes.string
      ]
    ),
    valueField: React.PropTypes.string,
    labelField: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      value: null,
      valueField: 'value',
      labelField: 'label',
      onChange: null
    };
  },

  getInitialState: function() {
    var selected = this.getSelectedFromProps(this.props);
    return {
      selected: selected
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var selected = this.getSelectedFromProps(nextProps);
    this.setState({
      selected: selected
    });
  },

  getSelectedFromProps(props) {
    var selected;
    if (props.value === null && props.options.length !== 0) {
      selected = props.options[0][props.valueField];
    } else {
      selected = props.value;
    }
    return selected;
  },

  render: function() {
    var self = this;
    var options = self.props.options.map(function(option) {
      return (
        <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
          {option[self.props.labelField]}
        </option>
      )
    });
    return (
      <select id={this.props.id}
          className='form-control'
          value={this.state.selected}
          onChange={this.handleChange}>
        {options}
      </select>
    )
  },

  handleChange: function(e) {
    if (this.props.onChange) {
      var change = {
        oldValue: this.state.selected,
        newValue: e.target.value
      }
      this.props.onChange(change);
    }
    this.setState({selected: e.target.value});
  }
});

module.exports = {
  SimpleNav,
  ScrollNav
};
