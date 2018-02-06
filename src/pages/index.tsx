import * as React from 'react'
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import Map from 'Components/Map';
import MapMarker from 'Components/MapMarker';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import BrewerySearch from 'Components/BrewerySearch';
import BreweryList from 'Components/BreweryList';
import { Brewery, BreweryState } from 'Stores/BreweryStore';
import { sortBreweriesByName } from 'Utils/Brewery';

interface IndexPageProps {
  data: {
    mongo: {
      breweries: Brewery[]
    }
  },
  BreweryStore: BreweryState
}

const LeftSide = styled(VerticalLayout) `
  height: 100%;
  flex-grow: 1;
`;

const RightSide = styled(VerticalLayout) `
  height: 100%;
  width: 300px;
  justify-content: flex-start;
  background-color: #f8f8f8;
`;

const ListHolder = styled.div`
  width: 100%;
  position: relative;
  flex-grow: 1;
`;

@inject('BreweryStore')
@observer
export default class IndexPage extends React.Component<IndexPageProps, {}> {
  componentDidMount() {
    if (typeof window === 'undefined') return;

    const { data, BreweryStore } = this.props;
    BreweryStore.breweries = data.mongo.breweries;
  }

  render() {
    console.log('rendering');
    const { data, BreweryStore } = this.props;

    let breweries = [];
    let filteredBreweries = [];

    // See if anything matched
    // if (BreweryStore.breweriesMatchingSearch.length) {
    //   breweries = BreweryStore.sortedBreweries;
    //   filteredBreweries = BreweryStore.breweriesMatchingSearch;
    // // Otherwise all breweries
    // } else if (BreweryStore.sortedBreweries.length) {
    //   breweries = BreweryStore.sortedBreweries;
    //   filteredBreweries = breweries;
    // // Static data
    // } else {
    //   breweries = sortBreweriesByName(data.mongo.breweries);
    //   filteredBreweries = breweries;
    // }

    return (
      <HorizontalLayout full>
        <LeftSide>
          <Map>
            { breweries.map((brewery) =>
              <MapMarker 
                key={brewery.id}
                lat={brewery.lat}
                lng={brewery.lng}
                breweryId={ brewery.id}
              />
            )}
          </Map>
        </LeftSide>
        <RightSide key={'rhs'}>
          <BrewerySearch />
          <ListHolder>
            <BreweryList breweries={filteredBreweries} />
          </ListHolder>
        </RightSide>
      </HorizontalLayout>
    );
  }
};

export const pageQuery = graphql`
  query IndexQuery {
    mongo {
      breweries {
        id,
        name,
        lat,
        lng,
        closed,
        locationName,
        website,
      }
    }
  }
`
