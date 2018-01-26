import * as React from 'react';
import styled from 'styled-components';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import BreweryListItemTyped from './BreweryListItem';

const BreweryListItem = BreweryListItemTyped as any;

const OuterVertical = styled(VerticalLayout)`
  position: absolute;
`;
const InnerVertical = styled(VerticalLayout)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
`;

const OuterHorizontal = styled(HorizontalLayout)`
  position: absolute;
`;
const InnerHorizontal = styled(HorizontalLayout)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
`;

interface TProps {
  breweries: any[];
}

const BreweryList = (({ breweries } : TProps) => {

  const Outer = OuterVertical;
  const Inner = InnerVertical;

  return (
    <Outer full scroll>
      <Inner>
        { breweries.map((brewery: any, i: number) => (
          <BreweryListItem
            brewery={brewery}
            key={brewery.id}
          />
        ))}
      </Inner>
    </Outer> 
  );
});

export default BreweryList;
