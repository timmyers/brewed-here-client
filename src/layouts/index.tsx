import * as React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Header from 'Components/Header';
import { AuthComponent } from 'Utils/Auth';

// Global styles
// import './index.css'
import './normalize.css';

const FullDiv = styled.div`
  width: 100%;
  height: 100%;
`;

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
        <AuthComponent />
        <Header />
        <FullDiv>
          {this.props.children()}
        </FullDiv>
      </FullDiv>
    )
  }
}

export default DefaultLayout
