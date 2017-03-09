import React from 'react';
import classnames from "classnames";
import enabledLocales from '../data/locales.js';

var MenuLink = React.createClass({
  render: function() {
    var className = classnames(`nav-link`, {
      "active": this.props.active === this.props.item
    });

    return (
      <a className={className} href={this.props.href}>{this.props.children}</a>
    );
  }
});

var ScrollNav = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    var active = `about`;
    if (typeof window === `object`) {
      active = window.location.hash.replace(`#`, ``) || `about`;
    }

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
    var hash = this.state.active;
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
        href: `#about`
      },
      {
        text: this.context.intl.formatMessage({id: `nav_get_involved2`}),
        item: `get-involved`,
        href: `#get-involved`
      }
    ];
    if (/^(en)(\b|$)/.test(this.context.intl.locale)) {
      links.splice(1, 0, {
        text: `More Resources`,
        item: `resources`,
        href: `/en-US/resources`
      });
    }

    return (
      <SimpleNav
        active={this.state.active}
        links={links}
        useLangPicker={this.props.useLangPicker}
      />
    );
  }
});

var SimpleNav = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  getInitialState: function() {
    return {
      navOpen: false
    };
  },
  onBarsClick: function() {
    this.setState({
      navOpen: !this.state.navOpen
    });
  },
  render: function() {
    var active = this.props.active || ``;
    var links = this.props.links;
    if (!links) {
      links = this.props.links || [
        {
          text: this.context.intl.formatMessage({id: `nav_copyright_campaign2`}),
          item: `about`,
          href: `/signup#about`
        },
        {
          text: this.context.intl.formatMessage({id: `nav_get_involved2`}),
          item: `get-involved`,
          href: `/signup#get-involved`
        }
      ];
      if (/^(en)(\b|$)/.test(this.context.intl.locale)) {
        links.splice(1, 0, {
          text: `More Resources`,
          item: `resources`,
          href: `/en-US/resources`
        });
      }
    }

    var navClassName = classnames(`nav`, {
      "open": this.state.navOpen
    });

    var langPicker = null;
    if (this.props.useLangPicker) {
      langPicker = (
        <Dropdown id='lang-selector'
          options={enabledLocales}
          value={this.context.intl.locale}
          labelField='description'
          valueField='code'
          onChange={dropDownOnChange}
        />
      );
    }
    return (
      <div className="nav-container">
        <div className={navClassName}>
          <div className="nav-logo-container">
            <a href="https://mozilla.org/" className="nav-logo"></a>
          </div>
          <div onClick={this.onBarsClick} className="bars-container">
            <i className="fa fa-bars fa-2x"></i>
          </div>
          {
            links.map((linkObj, index) => {
              return (
                <MenuLink key={index}
                  active={active}
                  item={linkObj.item}
                  href={linkObj.href}
                >
                  {linkObj.text}
                </MenuLink>
              );
            })
          }
          {langPicker}
        </div>
      </div>
    );
  }
});

var dropDownOnChange = function(change) {
  var url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '');
  window.location.href = url + '/' + change.newValue;
};

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
    return (
      <select id={this.props.id}
        className='form-control'
        value={this.state.selected}
        onChange={this.handleChange}
      >
      {
        this.props.options.map((option) => {
          return (
            <option key={option[this.props.valueField]} value={option[this.props.valueField]}>
              {option[this.props.labelField]}
            </option>
          )
        })
      }
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
