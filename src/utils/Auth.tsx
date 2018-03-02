import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as auth0 from 'auth0-js';
import { Route } from 'react-router-dom';
import { History } from 'history';
import { navigateTo } from 'gatsby-link';
import { AuthStore } from 'Stores/AuthStore';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.GATSBY_AUTH0_DOMAIN,
    clientID: process.env.GATSBY_AUTH0_CLIENT_ID,
    redirectUri: process.env.GATSBY_AUTH0_REDIRECT_URI,
    audience: process.env.GATSBY_AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile',
  });
  userProfile: auth0.Auth0UserProfile;

  handleAuthentication() {
    console.log('handleAuthentication');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        AuthStore.sub = authResult.idTokenPayload.sub;
        this.setSession(authResult);
        AuthStore.loggedIn = true;
        navigateTo('/');
        this.getProfile();
      } else if (err) {
        navigateTo('/');
        console.log(err);
      }
    });
  }

  setSession(authResult: any) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    AuthStore.loggedIn = false;
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    location.reload();
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  renewToken() {
    this.auth0.renewAuth(
      {
        audience: process.env.AUTH0_AUDIENCE,
        redirectUri: 'http://localhost:9000/silent',
        usePostMessage: true,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.setSession(result);
        }
      },
    );
  }

  login() {
    this.auth0.authorize();
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile() {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        console.log(profile);
      }
      // cb(err, profile);
    });
  }
}

const auth = new Auth();

export const login = () => auth.login();
export const logout = () => auth.logout();
export const isAuthenticated = () => auth.isAuthenticated();
export const getAccessToken = () => auth.getAccessToken();
export const getProfile = () => auth.getProfile();

export const LoginComponent: React.SFC = () => {
  auth.handleAuthentication();
  return (null);
};

export const AuthComponent: React.SFC = () => {
  if (auth.isAuthenticated()) {
    AuthStore.loggedIn = true;
  }
  return (null);
};