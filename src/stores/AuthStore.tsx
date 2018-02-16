import { observable } from 'mobx';

export class AuthState {
  constructor() {
    this.loggedIn = false;
  }

  @observable loggedIn: boolean;
  @observable sub: string;
}

export const AuthStore = new AuthState();
