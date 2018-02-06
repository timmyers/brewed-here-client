import * as React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { BreweryStore } from 'Stores/BreweryStore';

exports.replaceRouterComponent = ({ history }) => {
  return ({ children }) => (
    <Provider BreweryStore={BreweryStore}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};