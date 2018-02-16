import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components'; 
import Button from 'material-ui/Button';
import { login } from 'Utils/Auth';

const StyledButton = styled(Button)`
  margin-right: 10px;
  font-size: 14px;
  padding: 4px 8px;
  min-width: 60px;
  min-height: 30px;
  height: 50%;
`;

export default () => (
  <StyledButton raised onClick={login}>
    Log In
  </StyledButton>
);