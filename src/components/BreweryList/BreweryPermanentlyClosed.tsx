import * as React from 'react';
import styled from 'styled-components';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/Tooltip';


const StyledChip = styled(Chip as any)`
  background-color: #B93E38;
  font-size: 12px;
  color: white;
  height: 20px;
`;

export default () => (
  <Tooltip id="tooltip-closed" title="Brewery has permanently closed.">
    <StyledChip
      label="Closed"
    />
  </Tooltip>
);
