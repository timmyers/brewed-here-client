import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { isAuthenticated, getAccessToken } from 'Utils/Auth';

let clientTemp;

if (typeof window === 'undefined') {
  clientTemp = null;
} else {
  const httpLink = new HttpLink({
    uri: `${process.env.GATSBY_API_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    if (isAuthenticated()) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${getAccessToken()}`,
        },
      };
    }
    return headers;
  });

  clientTemp = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export const client = clientTemp;