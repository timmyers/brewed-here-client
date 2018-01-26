import * as React from 'react'
import styled from 'styled-components';
import Map from 'Components/Map';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const Holder = styled.div`
  width: 100%;
  height: 100%;
`;

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context)
  }
  public render() {
    return (
      <Map />
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
