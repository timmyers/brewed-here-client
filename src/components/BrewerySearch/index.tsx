import * as React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { InteractionStore } from 'Stores/InteractionStore';

const Holder = styled.div`
  padding: 10px;
  background-color: #eee;
`;

const BrewerySearch = () => (
  <Holder>
    <TextField
      id="brewerySearch"
      label="Search for a brewery"
      fullWidth
      onChange={e => InteractionStore.setBrewerySearchString(e.target.value)}
    />
  </Holder>
);

export default BrewerySearch;
