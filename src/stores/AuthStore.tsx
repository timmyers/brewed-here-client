import { observable, autorun } from 'mobx';
import gql from 'graphql-tag';

export class AuthState {
  constructor() {
    this.loggedIn = false;
  }

  @observable loggedIn: boolean;
  @observable sub: string;
}

export const AuthStore = new AuthState();
