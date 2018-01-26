import * as React from 'react';
import styled from 'styled-components';
import Link, { GatsbyLinkProps } from 'gatsby-link'

const MyLink: React.StatelessComponent<GatsbyLinkProps> = props => (
  <div className={props.className}>
    {props.children}
  </div>
);

const StyledLink = styled(MyLink)`
  text-decoration: none;
`;

export default MyLink;
