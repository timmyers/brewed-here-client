import * as React from 'react'
import { LoginComponent } from 'Utils/Auth';

export default class LoginPage extends React.Component<{}, {}> {
  render() {
    return (
      typeof window !== `undefined` ? <LoginComponent /> : null
    );
  }
};