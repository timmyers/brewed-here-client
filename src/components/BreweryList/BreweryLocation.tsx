import * as React from 'react';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Place from 'material-ui-icons/Place';
import Tooltip from 'material-ui/Tooltip';

const TitleHolder = styled(HorizontalLayout)`
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
`;

const TitleSpan = styled.span`
  font-size: 14px;
  color: #9B9B9B;
  font-family: sans-serif;
`;

const PlaceIcon = styled(Place as any)`
  color: #9B9B9B;
`;

interface Props {
  title: string;
}

export default ({ title }: Props) => (
  <Tooltip id="tooltip-location" title="Brewery has multiple locations.">
    <TitleHolder>
      <PlaceIcon />
      <TitleSpan>
        { title}
      </TitleSpan>
    </TitleHolder>
  </Tooltip>
);
