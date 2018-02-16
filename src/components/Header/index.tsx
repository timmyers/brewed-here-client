import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import HorizontalLayout from 'Components/HorizontalLayout';
import Link from 'Components/Link';
import { Brown } from 'Components/Colors';
import { BeerMapMarker } from 'Components/Icons';
import { AuthState } from 'Stores/AuthStore';
import SignupButton from './SignupButton';
import HeaderMenuButton from './HeaderMenuButton';

const Title = styled.h1`
  font-size: 4vh;
  color: ${Brown};
  margin: 0px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
`;

const HeaderIcon = styled(BeerMapMarker) `
  margin: 0px 10px;
  width: 5vh;
  height: 5vh;
`;

const HeaderHolder = styled(HorizontalLayout)`
  height: 8vh;
  background: #F9FAF7;
  align-items: center;
  justify-content: flex-start;
`;

interface HeaderProps {
  AuthStore: AuthState
}

@inject('AuthStore')
@observer
export default class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { AuthStore } = this.props;

    return (
      <HeaderHolder>
        <HorizontalLayout fullHeight alignCenter grow justifyStart>
          <HeaderIcon alt="logo" />
          <Title>
            <Link to="/">
              Brewed Here
            </Link>
          </Title>
        </HorizontalLayout>
        <HorizontalLayout fullHeight alignCenter justifyEnd>
          { AuthStore.loggedIn ?
            < HeaderMenuButton 
              showAdmin={AuthStore.sub === 'facebook|10213198044961330'}
            />
          :
            <SignupButton />
          }
        </HorizontalLayout>
      </HeaderHolder>
    )
  }
}