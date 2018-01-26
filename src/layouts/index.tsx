import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'Components/Link';
import HorizontalLayout from 'Components/HorizontalLayout';
import { BeerMapMarker } from 'Components/Icons';
import { Brown, Gray } from 'Components/Colors';

// Global styles
// import './index.css'
import './normalize.css';

const HeaderHolder = styled(HorizontalLayout)`
  height: 8vh;
  background: #F9FAF7;
  align-items: center;
  justify-content: flex-start;
`;

const FullDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 4vh;
  color: ${Brown};
  margin: 0px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
`;

const HeaderIcon = styled(BeerMapMarker)`
  margin: 0px 10px;
  width: 5vh;
  height: 5vh;
`;

const Header = () => (
  <HeaderHolder>
    <HeaderIcon alt="logo" />
    <Title>
      <Link to="/">
        Brewed Here
      </Link>
    </Title>
  </HeaderHolder>
)

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string
  }
  children: any
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
  public render() {
    return (
      <FullDiv>
        <Helmet
          title="Brewed Here - Visit Colorado Breweries"
          meta={[
            { name: 'description', content: 'Find, discover, and track your visits to Colorado breweries.' },
            { name: 'keywords', content: 'colorado, brewery, tracker, map, list, search' },
          ]}
        />
        <Header />
        <FullDiv>
          {this.props.children()}
        </FullDiv>
      </FullDiv>
    )
  }
}

export default DefaultLayout
