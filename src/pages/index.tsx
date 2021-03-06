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
    const { data, BreweryStore } = this.props;

    let listBreweries = [];
    let mapBreweries = [];

    // See if anything matched
    if (BreweryStore.breweriesMatchingSearch.length) {
      console.log('breweries case A');
      listBreweries = BreweryStore.breweriesMatchingSearch;
      mapBreweries = listBreweries;
    // Otherwise all breweries
    } else if (BreweryStore.sortedBreweries.length) {
      console.log('breweries case B');
      listBreweries = BreweryStore.breweriesInView;
      mapBreweries = BreweryStore.sortedBreweries;
    } else {
      console.log('breweries case C');
      listBreweries = sortBreweriesByName(data.mongo.breweries);
      mapBreweries = listBreweries;
    }

    return (
      <HorizontalLayout full>
        <LeftSide>
          <Map>
            { mapBreweries.map((brewery) =>
              <MapMarker 
                key={brewery.id}
                lat={brewery.lat}
                lng={brewery.lng}
                breweryId={brewery.id}
              />
            )}
          </Map>
        </LeftSide>
        <RightSide key={'rhs'}>
          <BrewerySearch />
          <ListHolder>
            <BreweryList breweries={listBreweries} />
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
