import * as React from 'react';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Web from 'material-ui-icons/Web';

const Holder = styled(HorizontalLayout)`
  justify-content: flex-start;
  align-items: center;
`;

const Link = styled.a`
  text-decoration: none;
`;

const VisitSpan = styled.span`
  font-size: 14px;
  color: #9B9B9B;
  font-family: sans-serif;
`;

const WebIcon = styled(Web as any)`
  color: #9B9B9B;
  margin-right: 5px;
`;

interface Props {
  url: string;
}

export default ({ url }: Props) => (
    <Link href={url} target="_blank">
      <Holder>
        <WebIcon />
        <VisitSpan>Website</VisitSpan>
      </Holder>
    </Link>
);
