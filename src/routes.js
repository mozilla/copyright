/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/

import { Route, IndexRoute, Redirect } from 'react-router';
import locales from '../public/locales.json';

var routes = (
  <Route path="/">
    {
      Object.keys(locales).map(function(locale) {
        return (
          <Route key={locale} path={locale}>
            <IndexRoute component={require('./pages/home.js')}/>
            <Route path='home' component={require('./pages/home.js')}/>
            <Route path='impact' component={require('./pages/impact.js')}/>
            <Route path='call-now' component={require('./pages/call-now.js')}/>
            <Route path='share' component={require('./pages/share.js')}/>
            <Route path='resources' component={require('./pages/resources.js')}/>
            <Redirect from="*" to={"/" + locale} />
          </Route>
        );
      })
    }
    <Redirect from="*" to="/" />
  </Route>
);

module.exports = routes;
