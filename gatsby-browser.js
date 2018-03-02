import * as React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ApolloProvider } from 'react-apollo'
import { BreweryStore } from 'Stores/BreweryStore';
import { AuthStore } from 'Stores/AuthStore';
import { client } from 'Utils/Apollo'

exports.onInitialClientRender = () => {
  const ssStyles = window.document.getElementById('server-side-jss')
  ssStyles && ssStyles.parentNode.removeChild(ssStyles)
}

exports.replaceRouterComponent = ({ history }) => {
  return ({ children }) => (
    <Provider BreweryStore={BreweryStore} AuthStore={AuthStore}>
      <ApolloProvider client={client}>
        <Router history={history}>{children}</Router>
      </ApolloProvider>
    </Provider>
  );
};