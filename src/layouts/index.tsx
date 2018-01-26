import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';

// Global styles
import './index.css'

const Holder = styled(HorizontalLayout)`
  height: 100px;
  background: #F9FAF7;
  align-items: center;
  justify-content: flex-start;
`;

const Header = () => (
  <Holder>
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: 'gray',
          textDecoration: 'none',
        }}
      >
        Gatsby
      </Link>
    </h1>
  </Holder>
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
      <div>
        <Helmet
          title="Brewed Here - Visit Colorado Breweries"
          meta={[
            { name: 'description', content: 'Find, discover, and track your visits to Colorado breweries.' },
            { name: 'keywords', content: 'colorado, brewery, tracker, map, list, search' },
          ]}
        />
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children()}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
